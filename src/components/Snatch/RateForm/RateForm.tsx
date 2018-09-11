import * as React from "react";
import cn from "./RateForm.css";
import { BetAmount } from "../../Forms/BetAmount/BetAmount";
import { TitleForInput } from "../../TitleForInput/TitleForInput";

export class RateForm extends React.Component {
    public render() {
        return (
            <div className={cn("wrap")}>
                <TitleForInput title="Ставка" hint="Минимальная ставка 30">
                    <BetAmount />
                </TitleForInput>
            </div>
        );
    }
}
