import * as React from "react";
import cn from "./NumberTitle.css";
import { CSSProperties } from "react";

interface IProps {
    value: number;
    title?: string;
    style?: CSSProperties;
}

export class NumberTitle extends React.Component<IProps> {
    public render() {
        const { value, title, style } = this.props;

        return (
            <div className={cn("wrap")} style={style}>
                <div className={cn("value")}>{value}</div>
                {title ? <div className={cn("title")}>{title}</div> : null}
            </div>
        );
    }
}
