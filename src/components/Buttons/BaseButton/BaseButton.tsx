import * as React from "react";
import cn from "./BaseButton.css";
import { CSSProperties } from "react";

interface IProps {
    onClick: () => void;
    style?: CSSProperties;
    use?: "success";
}

export class BaseButton extends React.Component<IProps> {
    public render() {
        const { onClick, style, use } = this.props;

        return (
            <button
                onClick={onClick}
                className={cn({
                    button: true,
                    buttonSuccess: use === "success",
                })}
                style={style}>
                {this.props.children}
            </button>
        );
    }
}
