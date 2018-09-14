import * as React from "react";
import { BaseButton } from "../../Buttons/BaseButton/BaseButton";

interface IProps {
    onClick: () => void;
}

export class BetAmountButton extends React.Component<IProps> {
    public render() {
        const { onClick } = this.props;
        return (
            <BaseButton style={{ padding: "4px 0" }} onClick={onClick}>
                {this.props.children}
            </BaseButton>
        );
    }
}
