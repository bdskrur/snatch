import * as React from "react";
import { BaseButton } from "../../Buttons/BaseButton/BaseButton";
import { BaseInput } from "../../Inputs/BaseInput/BaseInput";
import cn from "./BetAmount.css";

export class BetAmount extends React.Component {
    public render() {
        return (
            <div className={cn("wrap")}>
                <div className={cn("inputContainer")}>
                    <BaseInput />
                </div>
                <div className={cn("buttonsContainer")}>
                    <div className={cn("button")}>
                        <BaseButton>-</BaseButton>
                    </div>
                    <div className={cn("button")}>
                        <BaseButton>+</BaseButton>
                    </div>
                </div>
            </div>
        );
    }
}
