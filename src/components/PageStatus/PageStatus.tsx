import * as React from "react";
import cn from "./PageStatus.css";

interface IProps {
    message?: string;
}

export class PageStatus extends React.Component<IProps> {
    public render() {
        return this.props.message ? <div className={cn("wrap")}>{this.props.message}</div> : null;
    }
}
