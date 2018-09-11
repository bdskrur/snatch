import * as React from "react";
import { Fragment } from "react";
import { Cell } from "./Cell";
import { CellGroup } from "./CellGroup";
import { IColumn, IColumnGroup } from "../../models";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as uuid from "uuid";

declare type Columns<T> = Array<IColumn<T> | IGruppedColumns<T>>;

interface IGruppedColumns<T> {
    additionalComponent: (rowData: T) => JSX.Element;
    columns: Array<IColumn<T>>;
}

interface IProps<T> {
    data: T;
    columns: Array<IColumn<T>>;
    styleFn: any;
    columnsGroup?: Array<IColumnGroup<T>>;
    firstCellAddValue?: () => JSX.Element;
    collapseButton?: () => JSX.Element;
    onClick?: (row: T) => void;
}

@observer
export class Row<T> extends React.Component<IProps<T>> {
    @observable
    public hover: boolean = false;
    @observable
    public blockHover: boolean = false;

    public componentDidMount() {
        this.domId = uuid.v4();
    }

    @action
    public setHover = () => {
        this.blockHover = true;
        this.hover = true;
    };

    @action
    public removeHover = () => {
        this.blockHover = false;
        this.hover = false;
    };

    public render() {
        const { columns, columnsGroup, firstCellAddValue, data, styleFn, onClick, collapseButton } = this.props;
        const gruppedColumns = this.getGruppedColumns(columns, columnsGroup);
        const tableRowStyles = styleFn({
            row: true,
            rowHover: this.hover,
            rowCollapse: Boolean(collapseButton),
            rowPointer: Boolean(onClick),
        });

        return (
            <div
                className={tableRowStyles}
                onMouseEnter={this.onMouseEnterRow}
                onMouseLeave={this.onMouseLeaveRow}
                onClick={this.onClick}
                id={this.domId}>
                {gruppedColumns.map((column, columnIndex) => {
                    if ("additionalComponent" in column) {
                        const cells = column.columns.map((item, index) => {
                            return this.getCellComponent(item, index + columnIndex, firstCellAddValue);
                        });
                        const additionalComponent = column.additionalComponent(data);
                        return (
                            <CellGroup columns={column.columns} key={columnIndex} styleFn={styleFn}>
                                {additionalComponent}
                                {cells}
                            </CellGroup>
                        );
                    } else {
                        return this.getCellComponent(column, columnIndex, firstCellAddValue);
                    }
                })}
                {collapseButton && <div className={styleFn("rowCollapseButton")}>{collapseButton()}</div>}
            </div>
        );
    }

    private domId: string = "";

    private onClick = (event: React.FormEvent<HTMLDivElement>) => {
        if (!this.props.onClick) {
            return;
        }
        if (document.getElementById(this.domId) !== event.target) {
            return;
        }

        this.props.onClick!(this.props.data);
    };

    @action
    private onMouseEnterRow = (event: React.FormEvent<HTMLDivElement>) => {
        this.hover = this.blockHover ? this.hover : true;
    };

    @action
    private onMouseLeaveRow = (event: React.FormEvent<HTMLDivElement>) => {
        this.hover = this.blockHover ? this.hover : false;
    };

    private getCellComponent(column: IColumn<T>, columnIndex: number, firstCellAddValue?: () => JSX.Element) {
        let cellValue = this.getCellValue(column);
        if (firstCellAddValue && !columnIndex) {
            cellValue = this.appendCellValue(cellValue, firstCellAddValue);
        }

        let groupRowFirstCell = false;
        if (this.props.collapseButton && !columnIndex) {
            groupRowFirstCell = true;
        }

        return (
            <Cell key={columnIndex} column={column} marginRight_15={groupRowFirstCell} styleFn={this.props.styleFn}>
                {cellValue}
            </Cell>
        );
    }

    private getGruppedColumns(columns: Array<IColumn<T>>, columnsGroup?: Array<IColumnGroup<T>>): Columns<T> {
        if (!columnsGroup) {
            return columns;
        }

        const cloneColumns: Columns<T> = columns.map((col: IColumn<T>) => Object.assign({}, col));
        for (const columnGroup of columnsGroup) {
            let indexFrom;
            let indexTo;
            let length;
            indexFrom = cloneColumns.findIndex((value: IColumn<T>) => value.id === columnGroup.columnIdFrom);
            indexTo = cloneColumns.findIndex((value: IColumn<T>) => value.id === columnGroup.columnIdTo);

            if (indexFrom === -1 || indexTo === -1) {
                continue;
            }

            length = indexTo - indexFrom + 1;
            const group = {
                additionalComponent: columnGroup.additionalComponent,
                columns: cloneColumns.slice(indexFrom, indexTo + 1) as Array<IColumn<T>>,
            };
            cloneColumns.splice(indexFrom, length, group);
        }

        return cloneColumns;
    }

    private getCellValue(column: IColumn<T>) {
        const { data } = this.props;

        if (!this.props.collapseButton) {
            if (typeof column.cellData === "function") {
                column.renderData = column.cellData.bind(this, data, null);
            }
        }

        return typeof column.renderData === "function"
            ? column.renderData(this.hover, this.setHover, this.removeHover)
            : typeof column.cellData === "string"
                ? data[column.cellData!]
                : "";
    }

    private appendCellValue(cellValue: any, firstCellAddValue: () => JSX.Element) {
        return (
            <Fragment>
                {firstCellAddValue()}
                {cellValue}
            </Fragment>
        );
    }
}
