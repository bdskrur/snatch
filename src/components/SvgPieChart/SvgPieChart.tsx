import * as React from "react";
import { SvgPieChartPie } from "./SvgPieChartPie";

const colors = ["#43A19E", "#7B43A1", "#F2317A", "#FF9824", "#58CF6C"];

interface IProps {
    data?: any;
}

interface IState {
    data: any;
}

export class SvgPieChart extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [5, 12, 8, 3, 10],
        };
    }

    public componentDidMount() {
        setInterval(() => {
            let dataSize = getRandomInt(2, 6);
            const data = [];

            for (; dataSize--; ) {
                data.push(getRandomInt(1, 20));
            }

            this.setState({ data });
        }, 2000);
    }

    public render() {
        return (
            <div>
                <SvgPieChartPie
                    data={this.state.data}
                    radius={150}
                    hole={50}
                    colors={colors}
                    labels={true}
                    percent={true}
                    strokeWidth={3}
                    stroke={"#fff"}
                />

                <SvgPieChartPie
                    data={this.state.data}
                    radius={80}
                    hole={5}
                    colors={colors}
                    strokeWidth={3}
                    labels={true}
                />

                <SvgPieChartPie data={this.state.data} radius={80} hole={65} colors={colors} strokeWidth={1} />

                <SvgPieChartPie
                    data={this.state.data}
                    radius={150}
                    hole={0}
                    colors={colors}
                    strokeWidth={1}
                    stroke={"rgba(0, 0, 0, .5)"}
                />
            </div>
        );
    }
}

export function getAnglePoint(startAngle: any, endAngle: any, radius: any, x: any, y: any) {
    let x1;
    let y1;
    let x2;
    let y2;

    x1 = x + radius * Math.cos((Math.PI * startAngle) / 180);
    y1 = y + radius * Math.sin((Math.PI * startAngle) / 180);
    x2 = x + radius * Math.cos((Math.PI * endAngle) / 180);
    y2 = y + radius * Math.sin((Math.PI * endAngle) / 180);

    return { x1, y1, x2, y2 };
}

export function getRandomInt(min: any, max: any) {
    return Math.floor(Math.random() * (max - min)) + min;
}
