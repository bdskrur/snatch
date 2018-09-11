import * as React from "react";
import cn from "./PageWithWorkspace.css";

export class PageWithWorkspaceBar extends React.Component {
    public render() {
        return <div className={cn("bar")}>{this.props.children}</div>;
    }
}
