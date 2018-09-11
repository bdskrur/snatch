import * as React from "react";
import cn from "./TextButton.css";
import { CSSProperties } from "react";
import Button from "retail-ui/components/Button/Button";

interface IProps {
    onClick: () => void;
    className?: any;
    styles?: CSSProperties;
    disabled?: boolean;
}

export class TextButton extends React.Component<IProps> {
    public render() {
        const buttonStyles = cn({
            wrap: !this.props.disabled,
            [this.props.className]: this.props.className,
        });

        return (
            <span style={this.props.styles} className={buttonStyles}>
                <Button disabled={this.props.disabled} onClick={this.props.onClick} use="link" size="small">
                    {this.props.children}
                </Button>
            </span>
        );
    }
}
