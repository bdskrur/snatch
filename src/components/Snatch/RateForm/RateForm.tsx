import * as React from "react";
import cn from "./RateForm.css";
import { BetAmount } from "../../Forms/BetAmount/BetAmount";
import { WrapperForInput } from "../../ContentWrappers/WrapperForInput/WrapperForInput";
import { BaseButton } from "../../Buttons/BaseButton/BaseButton";

export class RateForm extends React.Component {
    public render() {
        return (
            <div className={cn("wrap")}>
                <WrapperForInput title="Ставка" hint="Минимальная ставка 30">
                    <BetAmount />
                </WrapperForInput>
                <WrapperForInput title="Прогноз" hint="Предполагаемая сумма банка">
                    <BetAmount />
                </WrapperForInput>
                <WrapperForInput>
                    <BaseButton use="success">Сделать прогноз</BaseButton>
                </WrapperForInput>
            </div>
        );
    }
}
