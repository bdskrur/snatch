import * as React from "react";
import { Row } from "./Row";
import Button from "retail-ui/components/Button/Button";
import { IColumn, IColumnGroup } from "../../models";
import Transition from "react-transition-group/Transition";
import { DEFAULT_ROW_HEIGHT } from "../../constants";

interface IProps<T> {
    data: T[];
    columns: Array<IColumn<T>>;
    styleFn?: any;
    columnsGroup?: Array<IColumnGroup<T>>;
    onRowClick?: (row: T) => void;
    onGroupRowClick?: (row: T[]) => void;
}

interface IState {
    expanded: boolean;
}

export class RowGroup<T> extends React.Component<IProps<T>, IState> {
    public state: IState = { expanded: false };

    public render() {
        const { columns, columnsGroup, data, onRowClick, styleFn } = this.props;
        const rowsMaxHeight = `${data.length * DEFAULT_ROW_HEIGHT}px`;
        const transitionStyles = {
            entering: { maxHeight: rowsMaxHeight, transition: "max-height 0.15s ease-out" },
            entered: { maxHeight: rowsMaxHeight },
            exiting: { maxHeight: 0, transition: "max-height 0.15s ease-out" },
            exited: { maxHeight: 0 },
        };
        return (
            <div>
                {this.getGroupRow()}
                <Transition timeout={200} in={this.state.expanded} appear={true}>
                    {(state: string) => (
                        <div
                            className={styleFn({
                                rowGroupAnimation: true,
                                rowGroupAnimationOverflow: state !== "entered",
                            })}
                            style={{ height: rowsMaxHeight, ...transitionStyles[state] }}>
                            <div className={styleFn("rowGroupContainer")} style={{ height: rowsMaxHeight }}>
                                {(this.state.expanded || state === "exiting") &&
                                    data.map((rowData, index) => (
                                        <Row
                                            columns={columns}
                                            data={rowData}
                                            key={index}
                                            firstCellAddValue={this.getIndentComponent}
                                            columnsGroup={columnsGroup}
                                            onClick={onRowClick}
                                            styleFn={styleFn}
                                        />
                                    ))}
                            </div>
                        </div>
                    )}
                </Transition>
            </div>
        );
    }

    public setCollapsed = (event: React.FormEvent<HTMLDivElement>) => {
        this.setState({
            expanded: true,
        });
    };

    private getGroupRow() {
        const { columns, columnsGroup, data, styleFn } = this.props;
        const groupRowColumns = columns.map((originColumn: IColumn<T>) => {
            const newColumn: IColumn<T> = {
                ...originColumn,
            };

            if (newColumn.groupCellData) {
                newColumn.renderData = newColumn.groupCellData.bind(this, data, this.setCollapsed);
            } else if (typeof newColumn.cellData === "function") {
                newColumn.renderData = newColumn.cellData.bind(this, data[0], this.setCollapsed);
            }

            return newColumn;
        });

        return (
            <Row
                columns={groupRowColumns}
                data={data[0]}
                columnsGroup={columnsGroup}
                collapseButton={this.getCollapseButton}
                onClick={this.onGroupRowClick}
                styleFn={styleFn}
            />
        );
    }

    private onGroupRowClick = () => {
        const { onGroupRowClick, data } = this.props;
        if (onGroupRowClick) {
            onGroupRowClick(data);
        }
    };

    private getCollapseButton = () => {
        return (
            <span className={this.props.styleFn("rowGroupArrowButton")}>
                <Button
                    icon={this.state.expanded ? "ArrowChevronDown" : "ArrowChevronRight"}
                    use="link"
                    onClick={this.toggleCollapsing}
                />
            </span>
        );
    };

    private toggleCollapsing = (event: React.FormEvent<HTMLButtonElement>) => {
        this.setState({
            expanded: !this.state.expanded,
        });
    };

    private getIndentComponent() {
        return <span style={{ marginRight: 15 }} />;
    }
}
