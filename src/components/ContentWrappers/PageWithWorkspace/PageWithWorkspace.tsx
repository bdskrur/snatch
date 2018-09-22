import * as React from "react";
import { MainWrap } from "..";
import { PageWithWorkspaceBar } from "./PageWithWorkspaceBar";
import { PageWithWorkspaceBody } from "./PageWithWorkspaceBody";
import cn from "./PageWithWorkspace.css";
import { PageWithWorkspaceBodyColumn } from "./PageWithWorkspaceBodyColumn";

export class PageWithWorkspace extends React.Component {
    public static Bar = PageWithWorkspaceBar;
    public static Body = PageWithWorkspaceBody;
    public static Column = PageWithWorkspaceBodyColumn;

    public render() {
        return (
            <MainWrap>
                <div className={cn("wrap")}>{this.props.children}</div>
            </MainWrap>
        );
    }
}
