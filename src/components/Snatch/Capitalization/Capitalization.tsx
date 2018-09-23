import * as React from "react";
import { inject, observer } from "mobx-react";
import { RootStore } from "../../../stores";
import { SvgPieChartPie } from "../../SvgPieChart/SvgPieChartPie";
import { CapitalizationLegend } from "./CapitalizationLegend";
import cn from "./Capitalization.css";
// import { formatSize } from "../../../utils/historyHelpers";
import CountUp from "react-countup";

interface IProps {
    rootStore?: RootStore;
}

@inject("rootStore")
@observer
export class Capitalization extends React.Component<IProps> {
    public render() {
        return (
            <div className={cn("wrap")}>
                <CapitalizationLegend data={this.snatchGeneratorStore.playersSegmentsLegend} />
                <SvgPieChartPie
                    data={this.snatchGeneratorStore.playersSegmentsPie}
                    radius={120}
                    hole={90}
                    centerText={
                        <span>
                            <CountUp
                                start={this.snatchGeneratorStore.playersCapitalizationPrev}
                                end={this.snatchGeneratorStore.playersCapitalization}
                                separator=" "
                            />{" "}
                            $
                        </span>
                    }
                    centerTitle="Сумма Капитализации"
                />
            </div>
        );
    }

    private snatchGeneratorStore = this.props.rootStore!.snatchGeneratorStore;
}
