import * as React from "react";
import { BaseInput } from "../../Inputs/BaseInput/BaseInput";
import cn from "./BetAmount.css";
import { BetAmountButton } from "./BetAmountButton";

export class BetAmount extends React.Component {
    public render() {
        return (
            <div className={cn("wrap")}>
                <div className={cn("inputContainer")}>
                    <BaseInput />
                </div>
                <div className={cn("buttonsContainer")}>
                    <div className={cn("button")}>
                        <BetAmountButton>-</BetAmountButton>
                    </div>
                    <div className={cn("button")}>
                        <BetAmountButton>+</BetAmountButton>
                    </div>
                </div>
            </div>
        );
    }
}
