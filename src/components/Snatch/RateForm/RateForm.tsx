import * as React from "react";
import cn from "./RateForm.css";
import { BetAmount } from "../../Forms/BetAmount/BetAmount";
import { WrapperForInput } from "../../ContentWrappers/WrapperForInput/WrapperForInput";
import { BaseButton } from "../../Buttons/BaseButton/BaseButton";
import { inject, observer } from "mobx-react";
import { RootStore } from "../../../stores";
import { NumberTitle } from "../../NumberTitle/NumberTitle";
import Gapped from "retail-ui/components/Gapped/Gapped";

interface IProps {
    rootStore?: RootStore;
}

@inject("rootStore")
@observer
export class RateForm extends React.Component<IProps> {
    public render() {
        return (
            <div className={cn("wrap")}>
                <Gapped gap={15} vertical={true}>
                    <NumberTitle value={this.model.timeLeft} style={{ background: "#732a2a" }} />
                    <NumberTitle value={this.model.peopleCount} title="Игроков онлайн" />
                    <NumberTitle
                        value={this.model.playerCount}
                        title="Игроков сделали вклад"
                        style={{ background: "rgba(2, 166, 242, 0.5)" }}
                    />
                    <WrapperForInput title="Вклад" hint="Минимальный вклад 30">
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
                    <div>
                        <BaseButton use="success" onClick={this.model.sendBet}>
                            Отправить
                        </BaseButton>
                    </div>
                </Gapped>
            </div>
        );
    }

    private model = this.props.rootStore!.snatchGeneratorStore;
}
