import * as React from "react";
import { SvgPieChartSlice } from "./SvgPieChartSlice";

interface IProps {
    data: any;
    colors: any;
    hole: any;
    radius: any;
    labels?: any;
    percent?: boolean;
    stroke?: any;
    strokeWidth?: any;
}

export class SvgPieChartPie extends React.Component<IProps> {
    public render() {
        const { colors, labels, hole, radius, data } = this.props;
        const sum = data.reduce((carry: any, current: any) => carry + current, 0);
        const diameter = radius * 2;
        const colorsLength = colors.length;

        let startAngle = 0;

        return (
            <svg
                width={diameter}
                height={diameter}
                viewBox={"0 0 " + diameter + " " + diameter}
                xmlns="http://www.w3.org/2000/svg"
                version="1.1">
                {data.map((slice: any, sliceIndex: any) => {
                    const nextAngle = startAngle;
                    const angle = (slice / sum) * 360;
                    const percent = (slice / sum) * 100;
                    startAngle += angle;

                    return (
                        <SvgPieChartSlice
                            key={sliceIndex}
                            value={slice}
                            percent={this.props.percent}
                            percentValue={percent.toFixed(1)}
                            startAngle={nextAngle}
                            angle={angle}
                            radius={radius}
                            hole={radius - hole}
                            trueHole={hole}
                            showLabel={labels}
                            fill={colors[sliceIndex % colorsLength]}
                            stroke={this.props.stroke}
                            strokeWidth={this.props.strokeWidth}
                        />
                    );
                })}
            </svg>
        );
    }
}
