import * as React from "react";
import cn from "./DangerButton.css";
import Button from "retail-ui/components/Button/Button";
import { CSSProperties } from "react";

interface IProps {
    onClick?: () => void;
    width?: number;
    style?: CSSProperties;
}

export class DangerButton extends React.Component<IProps, {}> {
    public render() {
        return (
            <div style={this.props.style} className={cn("wrap")}>
                <Button
                    onClick={this.props.onClick}
                    use="danger"
                    size="medium"
                    width={this.props.width ? `${this.props.width}px` : "100%"}>
                    {this.props.children}
                </Button>
            </div>
        );
    }
}
