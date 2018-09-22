import * as React from "react";
import { inject, observer } from "mobx-react";
import { RootStore } from "../../../stores";
import { SvgPieChartPie } from "../../SvgPieChart/SvgPieChartPie";
import { CapitalizationLegend } from "./CapitalizationLegend";
import cn from "./Capitalization.css";

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
                    radius={150}
                    hole={120}
                    labels={true}
                />
            </div>
        );
    }

    private snatchGeneratorStore = this.props.rootStore!.snatchGeneratorStore;
}
