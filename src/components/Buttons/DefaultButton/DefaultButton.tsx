import * as React from "react";
import cn from "./DefaultButton.css";
import Button from "retail-ui/components/Button/Button";
import { CSSProperties } from "react";
import { ButtonProps } from "retail-ui/components/Button";

interface IProps extends ButtonProps {
    width?: number;
    style?: CSSProperties;
}

export class DefaultButton extends React.Component<IProps, {}> {
    public render() {
        const { style, children, width, ...buttonProps } = this.props;
        return (
            <div style={style} className={cn("wrap")}>
                <Button use="pay" size="medium" width={width ? `${width}px` : "100%"} {...buttonProps}>
                    {children}
                </Button>
            </div>
        );
    }
}
