import * as React from "react";
import cn from "./BaseButton.css";
import { CSSProperties } from "react";

interface IProps {
    style?: CSSProperties;
    use?: "success";
}

export class BaseButton extends React.Component<IProps> {
    public render() {
        return (
            <button
                className={cn({
                    button: true,
                    buttonSuccess: this.props.use === "success",
                })}
                style={this.props.style}>
                {this.props.children}
            </button>
        );
    }
}
