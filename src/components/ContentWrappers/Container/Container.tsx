import * as React from "react";
import cn from "./Container.css";
import { ContainerTitle } from "./ContainerTitle";
import { ContainerBody } from "./ContainerBody";

export class Container extends React.Component {
    public static Title = ContainerTitle;
    public static Body = ContainerBody;

    public render() {
        return <div className={cn("container")}>{this.props.children}</div>;
    }
}
