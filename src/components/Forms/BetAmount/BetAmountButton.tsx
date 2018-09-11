import * as React from "react";
import { BaseButton } from "../../Buttons/BaseButton/BaseButton";

export class BetAmountButton extends React.Component {
    public render() {
        return <BaseButton style={{ padding: "4px 0" }}>{this.props.children}</BaseButton>;
    }
}
