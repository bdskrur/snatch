import * as React from "react";
import cn from "./LinkButton.css";
import Button from "retail-ui/components/Button/Button";
import { IconName } from "retail-ui/components/Icon";
import { ButtonSize } from "retail-ui/components/Button";

interface IProps {
    onClick?: () => void;
    width?: number;
    disabled?: boolean;
    icon?: IconName | React.ReactElement<any>;
    size?: ButtonSize;
}

export class LinkButton extends React.Component<IProps, {}> {
    public render() {
        const { disabled, onClick, width, children, icon, size } = this.props;
        const buttonStyles = cn({
            wrap: true,
        });

        return (
            <div className={buttonStyles}>
                <Button
                    disabled={disabled}
                    onClick={onClick}
                    icon={icon ? icon : undefined}
                    use="link"
                    size={size ? size : "medium"}
                    width={width ? `${width}px` : "100%"}>
                    {children}
                </Button>
            </div>
        );
    }
}
