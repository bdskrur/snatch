import * as React from "react";
import { BaseInput } from "../../Inputs/BaseInput/BaseInput";
import cn from "./BetAmount.css";
import { BetAmountButton } from "./BetAmountButton";

interface IProps {
    value: string | number;
    increment: () => void;
    decrement: () => void;
    onChange: (e: any) => void;
}

export class BetAmount extends React.Component<IProps> {
    public render() {
        const { onChange, increment, decrement, value } = this.props;
        return (
            <div className={cn("wrap")}>
                <div className={cn("inputContainer")}>
                    <BaseInput value={value} onChange={onChange} />
                </div>
                <div className={cn("buttonsContainer")}>
                    <div className={cn("button")}>
                        <BetAmountButton onClick={decrement}>-</BetAmountButton>
                    </div>
                    <div className={cn("button")}>
                        <BetAmountButton onClick={increment}>+</BetAmountButton>
                    </div>
                </div>
            </div>
        );
    }
}
