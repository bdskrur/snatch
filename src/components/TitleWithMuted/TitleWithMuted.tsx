import * as React from "react";
import cn from "./TitleWithMuted.css";

interface IProps {
    title: string;
    muted: string | number;
}

export class TitleWithMuted extends React.Component<IProps> {
    public render() {
        return (
            <div>
                <span>{this.props.title}</span> <span className={cn("muted")}>{this.props.muted}</span>
            </div>
        );
    }
}
