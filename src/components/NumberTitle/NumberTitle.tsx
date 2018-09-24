import * as React from "react";
import cn from "./NumberTitle.css";
import { CSSProperties } from "react";
import CountUp from "react-countup";

interface IProps {
    value: number | string;
    title?: string;
    style?: CSSProperties;
}

export class NumberTitle extends React.Component<IProps> {
    public componentWillUpdate(nextProps: IProps) {
        this.prevValue = this.props.value;
    }

    public render() {
        const { value, title, style } = this.props;

        return (
            <div className={cn("wrap")} style={style}>
                <div className={cn("value")}>
                    {typeof value === "number" ? <CountUp start={this.prevValue} end={value} /> : value}
                </div>
                {title ? <div className={cn("title")}>{title}</div> : null}
            </div>
        );
    }

    private prevValue: number | string = 0;
}
