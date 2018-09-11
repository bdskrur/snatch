import * as React from "react";
import cn from "./MainWrap.css";

export class MainWrap extends React.Component {
    public render() {
        return (
            <div className={cn("wrap")}>
                <div className={cn("content")}>{this.props.children}</div>
            </div>
        );
    }
}
