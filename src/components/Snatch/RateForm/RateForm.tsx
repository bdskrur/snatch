import * as React from "react";
import cn from "./RateForm.css";
import { BetAmount } from "../../Forms/BetAmount/BetAmount";
import { WrapperForInput } from "../../ContentWrappers/WrapperForInput/WrapperForInput";
import { BaseButton } from "../../Buttons/BaseButton/BaseButton";
import { inject, observer } from "mobx-react";
import { RootStore } from "../../../stores";

interface IProps {
    rootStore?: RootStore;
}

@inject("rootStore")
@observer
export class RateForm extends React.Component<IProps> {
    public render() {
        return (
            <div className={cn("wrap")}>
                <WrapperForInput title="Ставка" hint="Минимальная ставка 30">
                    <BetAmount
                        value={this.model.myBet}
                        onChange={this.model.onChangeMyBet}
                        increment={this.model.incrementMyBet}
                        decrement={this.model.decrementMyBet}
                    />
                </WrapperForInput>
                <WrapperForInput title="Прогноз" hint="Предполагаемая сумма банка">
                    <BetAmount
                        value={this.model.myPrediction}
                        onChange={this.model.onChangeMyPrediction}
                        increment={this.model.incrementMyPrediction}
                        decrement={this.model.decrementMyPrediction}
                    />
                </WrapperForInput>
                <div style={{ marginTop: -14 }}>
                    <BaseButton use="success" onClick={this.model.sendBet}>
                        Отправить
                    </BaseButton>
                </div>
            </div>
        );
    }

    private model = this.props.rootStore!.snatchGeneratorStore;
}
