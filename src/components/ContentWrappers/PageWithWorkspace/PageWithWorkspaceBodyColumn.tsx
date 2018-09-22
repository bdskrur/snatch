import * as React from "react";
import cn from "./PageWithWorkspace.css";

export class PageWithWorkspaceBodyColumn extends React.Component {
    public render() {
        return <div className={cn("column")}>{this.props.children}</div>;
    }
}
