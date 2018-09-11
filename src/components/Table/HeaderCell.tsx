import * as React from "react";
import { Cell } from "./Cell";
import Icon from "retail-ui/components/Icon/Icon";
import Gapped from "retail-ui/components/Gapped/Gapped";
import { IColumn, SortCondition } from "../../models";

interface IProps<T> {
    column: IColumn<T>;
    onClick: (column: IColumn<T>) => void;
    styleFn: any;
}

export class HeaderCell<T> extends React.Component<IProps<T>> {
    public render() {
        const { column } = this.props;
        const isSorted = column.sortCondition;
        const sortIconName = column.sortCondition === SortCondition.Asc ? "SortUp" : "SortDown";
        const headerCellStyle = this.props.styleFn({
            headerCell: true,
            headerCellInactive: !this.props.column.sorting,
        });
        const headerCellIconStyle = this.props.styleFn({
            headerCellIcon: true,
            headerCellIconHide: !isSorted,
        });

        return (
            <Cell column={column} onClick={this.onClick} styleFn={this.props.styleFn}>
                <div className={headerCellStyle} style={column.headerStyles}>
                    <Gapped gap={0}>
                        {column.headerName}
                        <span className={headerCellIconStyle}>
                            <Icon name={sortIconName} />
                        </span>
                    </Gapped>
                </div>
            </Cell>
        );
    }

    private onClick = () => {
        if (this.props.column.sorting) {
            this.props.onClick(this.props.column);
        }
    };
}
