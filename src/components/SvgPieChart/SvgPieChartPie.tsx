import * as React from "react";
import { SvgPieChartSlice } from "./SvgPieChartSlice";
import cn from "./SvgPieChart.css";

export interface ISvgPieChartPie {
    value: number;
    fill: string;
    stroke: string;
    strokeWidth?: number;
}

interface IProps {
    data: ISvgPieChartPie[];
    hole: any;
    radius: any;
    labels?: any;
    percent?: boolean;
    stroke?: any;
    centerText?: string;
    centerTitle?: string;
}

export class SvgPieChartPie extends React.Component<IProps> {
    public render() {
        const { labels, hole, radius, data, centerText, centerTitle } = this.props;
        const sum = data.map(pie => pie.value).reduce((carry: any, current: any) => carry + current, 0);
        const diameter = radius * 2;

        let startAngle = 0;

        return (
            <div className={cn("wrap")}>
                <svg
                    style={{ overflow: "visible" }}
                    width={diameter}
                    height={diameter}
                    viewBox={"0 0 " + diameter + " " + diameter}
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1">
                    {data.map((slice, sliceIndex) => {
                        const nextAngle = startAngle;
                        const angle = (slice.value / sum) * 360;
                        const percent = (slice.value / sum) * 100;
                        startAngle += angle;

                        return (
                            <SvgPieChartSlice
                                key={sliceIndex}
                                value={slice.value}
                                percent={this.props.percent}
                                percentValue={percent.toFixed(1)}
                                startAngle={nextAngle}
                                angle={angle}
                                radius={radius}
                                hole={radius - hole}
                                trueHole={hole}
                                showLabel={labels}
                                fill={slice.fill}
                                stroke={slice.stroke}
                                strokeWidth={slice.strokeWidth}
                            />
                        );
                    })}
                </svg>
                {centerText || centerTitle ? (
                    <div className={cn("sum")}>
                        {centerText ? <div className={cn("sumText")}>{centerText}</div> : null}
                        {centerTitle ? <div className={cn("sumTitle")}>{centerTitle}</div> : null}
                    </div>
                ) : null}
            </div>
        );
    }
}
