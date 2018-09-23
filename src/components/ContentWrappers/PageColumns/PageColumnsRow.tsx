import * as React from "react";
import cn from "./PageColumns.css";

export class PageColumnsRow extends React.Component {
    public render() {
        return <div className={cn("row")}>{this.props.children}</div>;
    }
}
