import * as React from "react";
import cn from "./TableStyles/Table.less";
import { Row } from "./Row";
import { RowGroup } from "./RowGroup";
import { HeaderCell } from "./HeaderCell";
import { TableModel } from "../../models";

interface IProps<T> {
    model: TableModel<T>;
    data: T[][];
    styleFn?: any;
    emptyDataText?: string;
}

export class Table<T> extends React.Component<IProps<T>> {
    private styleFn: any;

    public componentWillMount() {
        this.styleFn = this.props.styleFn ? this.props.styleFn : cn;
    }

    public render() {
        const { data, emptyDataText } = this.props;
        const { columns, columnsGroup, onSort, onRowClick, onGroupRowClick } = this.props.model;
        return (
            <div className={this.styleFn("table")}>
                <div className={this.styleFn("tableHeaders")}>
                    {columns.map((column, index) => (
                        <HeaderCell key={index} column={column} onClick={onSort} styleFn={this.styleFn} />
                    ))}
                </div>
                {data.map((row: any, rowIndex: number) => {
                    return row.length > 1 ? (
                        <RowGroup
                            key={rowIndex}
                            columns={columns}
                            data={row}
                            columnsGroup={columnsGroup}
                            onRowClick={onRowClick}
                            onGroupRowClick={onGroupRowClick}
                            styleFn={this.styleFn}
                        />
                    ) : (
                        <Row
                            key={rowIndex}
                            columns={columns}
                            data={row[0]}
                            columnsGroup={columnsGroup}
                            onClick={onRowClick}
                            styleFn={this.styleFn}
                        />
                    );
                })}
                {data.length === 0 && <div className={cn("emptyDataText")}>{emptyDataText}</div>}
            </div>
        );
    }
}
