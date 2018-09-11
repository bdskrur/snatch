import * as React from "react";
import cn from "./SideBar.css";

export class SideBar extends React.Component {
    public render() {
        return <div className={cn("wrap")}>{this.props.children}</div>;
    }
}
