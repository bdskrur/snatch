import * as React from "react";
import cn from "./Container.css";

interface IProps {
    component?: JSX.Element;
}

export class ContainerTitle extends React.Component<IProps> {
    public render() {
        return (
            <div className={cn("containerTitle")}>
                <div className={cn("containerTitleText")}>{this.props.children}</div>
                <div>{this.props.component}</div>
            </div>
        );
    }
}
