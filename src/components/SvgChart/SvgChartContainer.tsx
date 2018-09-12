import * as React from "react";
import cn from "./SvgChart.css";
import { action, computed, observable } from "mobx";
import { observer } from "mobx-react";
import { CSSProperties } from "react";
const STEP_HELP_LINE = 50;

@observer
export class SvgChartContainer extends React.Component {
    public render() {
        return (
            <div className={cn("svgChartContainer")} ref={this.ref}>
                <div className={cn("svgChartContainerBody")}>{this.props.children}</div>
                <div className={cn("axisY")} />
                <div className={cn("axisX")} />
                {this.gridX}
                {this.gridY}
            </div>
        );
    }

    @computed
    private get gridY(): JSX.Element[] {
        if (!this.wrap) {
            return [];
        }
        const count = this.wrap.clientWidth / STEP_HELP_LINE;
        const elements = [];
        for (let i = 1; i < count + 1; i++) {
            elements.push(this.renderHelpLine("helpLineY", { left: STEP_HELP_LINE * i + 20 }, i));
        }
        return elements;
    }

    @computed
    private get gridX(): JSX.Element[] {
        if (!this.wrap) {
            return [];
        }
        const count = this.wrap.clientHeight / STEP_HELP_LINE;
        const elements = [];
        for (let i = 1; i < count + 1; i++) {
            elements.push(this.renderHelpLine("helpLineX", { bottom: STEP_HELP_LINE * i + 20 }, i));
        }
        return elements;
    }

    private renderHelpLine = (className: string, style: CSSProperties, index: number) => {
        return <div className={cn(className)} style={style} key={index} />;
    };

    @observable
    private wrap: any;
    @action
    private ref = (instance: any) => {
        this.wrap = instance;
    };
}
