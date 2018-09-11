import * as React from "react";
import cn from "./PageWithWorkspace.css";

export class PageWithWorkspaceBody extends React.Component {
    public render() {
        return <div className={cn("body")}>{this.props.children}</div>;
    }
}
