import * as React from "react";
import { MainWrap } from "..";
import { PageColumnsColumn } from "./PageColumnsColumn";
import { PageColumnsRow } from "./PageColumnsRow";

export class PageColumns extends React.Component {
    public static Column = PageColumnsColumn;
    public static Row = PageColumnsRow;

    public render() {
        return <MainWrap>{this.props.children}</MainWrap>;
    }
}
