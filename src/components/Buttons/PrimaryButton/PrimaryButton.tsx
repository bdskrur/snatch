import * as React from "react";
import cn from "./PrimaryButton.css";
import Button from "retail-ui/components/Button/Button";

interface IProps {
    onClick?: () => void;
    width?: number;
    height_32px?: boolean;
    disabled?: boolean;
    height_34px?: boolean;
}

export class PrimaryButton extends React.Component<IProps, {}> {
    public render() {
        const buttonStyles = cn({
            wrap: true,
            wrapButtonHeight34px: this.props.height_34px,
        });

        return (
            <div className={buttonStyles}>
                <Button
                    disabled={this.props.disabled}
                    onClick={this.props.onClick}
                    use="primary"
                    size="medium"
                    width={this.props.width ? `${this.props.width}px` : "100%"}>
                    {this.props.children}
                </Button>
            </div>
        );
    }
}
