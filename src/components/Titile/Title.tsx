import * as React from "react";
import cn from "./Title.css";

export class Title extends React.Component {
    public render() {
        return <div className={cn("titleContainer")}>{this.props.children}</div>;
    }
}
