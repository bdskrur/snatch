import * as React from "react";
import { NumberTitle } from "../../NumberTitle/NumberTitle";
import { SvgPieChartPie } from "../../SvgPieChart/SvgPieChartPie";
import { Gapped } from "retail-ui/components";
import { inject, observer } from "mobx-react";
import { RootStore } from "../../../stores";

interface IProps {
    rootStore?: RootStore;
}

@inject("rootStore")
@observer
export class PeoplesVsPlayers extends React.Component<IProps> {
    public render() {
        return (
            <Gapped vertical={true} gap={15}>
                <div>
                    <NumberTitle
                        value={this.snatchGeneratorStore.peoples.length}
                        title="Игроков онлайн"
                        style={{ background: "rgb(31, 45, 60)", borderRadius: "10px 10px 0 0" }}
                    />
                    <NumberTitle
                        value={this.snatchGeneratorStore.players.length}
                        title="Игроков сделали вклад"
                        style={{ background: "rgba(2, 166, 242, 0.5)", borderRadius: "0 0 10px 10px" }}
                    />
                </div>
                <SvgPieChartPie
                    data={this.snatchGeneratorStore.playersVsPeoplesPie}
                    radius={120}
                    hole={0}
                    labels={true}
                    percent={true}
                />
            </Gapped>
        );
    }

    private snatchGeneratorStore = this.props.rootStore!.snatchGeneratorStore;
}
