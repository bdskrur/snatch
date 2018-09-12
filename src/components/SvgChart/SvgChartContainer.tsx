import * as React from "react";
import cn from "./SvgChart.css";

export class SvgChartContainer extends React.Component {
    public render() {
        return (
            <div className={cn("svgChartContainer")}>
                <div className={cn("svgChartContainerBody")}>{this.props.children}</div>
            </div>
        );
    }
}
