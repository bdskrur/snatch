import * as React from "react";
import { ITableNameValueRow } from "../../models/TableNameValue/ITableNameValueRow";
import cn from "./TableNameValue.css";
import { CSSProperties } from "react";

interface IProps<T> {
    model: Array<ITableNameValueRow<T>>;
    data: T;
    titleStyle?: CSSProperties;
}

// todo: Сделать позиционирование с помощью flex(table)
// todo: Заголовок и поле на разной высоте

export class TableNameValue<T> extends React.Component<IProps<T>> {
    public render() {
        return (
            <div className={cn("wrap")}>
                {this.props.model.map((row, i) => (
                    <div key={i} className={cn("row")}>
                        <div className={cn("name")} style={this.props.titleStyle}>
                            {row.title}
                        </div>
                        <div className={cn("value")}>{this.props.data && row.view(this.props.data)}</div>
                    </div>
                ))}
            </div>
        );
    }
}
