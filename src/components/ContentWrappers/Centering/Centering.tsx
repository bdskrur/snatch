import * as React from "react";
import cn from "./Centering.css";

export class Centering extends React.Component<{ height?: number }, {}> {
    public render() {
        return (
            <div className={cn("wrap")} style={{ height: this.props.height ? `${this.props.height}px` : "100%" }}>
                {this.props.children}
            </div>
        );
    }
}
