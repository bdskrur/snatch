import * as React from "react";
import cn from "./RateForm.css";
import { BetAmount } from "../../Forms/BetAmount/BetAmount";

export class RateForm extends React.Component {
    public render() {
        return (
            <div className={cn("wrap")}>
                <div>
                    <BetAmount />
                </div>
            </div>
        );
    }
}
