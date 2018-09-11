import * as React from "react";
import { MainWrap } from "..";
import { PageColumn } from "./PageColumn/PageColumn";

export class PageColumns extends React.Component {
    public static Column = PageColumn;

    public render() {
        return <MainWrap>{this.props.children}</MainWrap>;
    }
}
