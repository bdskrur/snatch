import * as React from "react";
import { getAnglePoint } from "./SvgPieChart";

interface IProps {
    value: any;
    percent: any;
    percentValue: any;
    startAngle: any;
    angle: any;
    radius: any;
    hole: any;
    trueHole: any;
    showLabel: any;
    fill: any;
    stroke: any;
    strokeWidth: any;
}

interface IState {
    path: any;
    x: any;
    y: any;
}

export class SvgPieChartSlice extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            path: "",
            x: 0,
            y: 0,
        };
    }

    public componentWillReceiveProps() {
        this.setState({ path: "" });
        this.animate();
    }

    public componentDidMount() {
        this.animate();
    }

    public render() {
        return (
            <g overflow="hidden">
                <path
                    d={this.state.path}
                    fill={this.props.fill}
                    stroke={this.props.stroke}
                    strokeWidth={this.props.strokeWidth ? this.props.strokeWidth : 3}
                />
                {this.props.showLabel && this.props.percentValue > 5 ? (
                    <text x={this.state.x} y={this.state.y} fill="#fff" textAnchor="middle">
                        {this.props.percent ? this.props.percentValue + "%" : this.props.value}
                    </text>
                ) : null}
            </g>
        );
    }

    private animate = () => {
        this.draw(0);
    };

    private draw = (s: number) => {
        // if (!this.isMounted()) {
        //     return;
        // }
        const path = [];
        const p = this.props;

        let a;
        let b;
        let c;
        let step: any;

        // var p = this.props, path = [], a, b, c, self = this, step;

        step = p.angle / (37.5 / 2);

        s = p.angle;
        // animate
        // if (s + step > p.angle) {
        //     s = p.angle;
        // }

        // Get angle points
        a = getAnglePoint(p.startAngle, p.startAngle + s, p.radius, p.radius, p.radius);
        b = getAnglePoint(p.startAngle, p.startAngle + s, p.radius - p.hole, p.radius, p.radius);

        path.push("M" + a.x1 + "," + a.y1);
        path.push("A" + p.radius + "," + p.radius + " 0 " + (s > 180 ? 1 : 0) + ",1 " + a.x2 + "," + a.y2);
        path.push("L" + b.x2 + "," + b.y2);
        path.push(
            "A" +
                (p.radius - p.hole) +
                "," +
                (p.radius - p.hole) +
                " 0 " +
                (s > 180 ? 1 : 0) +
                ",0 " +
                b.x1 +
                "," +
                b.y1
        );

        // Close
        path.push("Z");

        this.setState({ path: path.join(" ") });

        if (s < p.angle) {
            setTimeout(() => {
                this.draw(s + step);
            }, 16);
        } else if (p.showLabel) {
            c = getAnglePoint(
                p.startAngle,
                p.startAngle + p.angle / 2,
                p.radius / 2 + p.trueHole / 2,
                p.radius,
                p.radius
            );

            this.setState({
                x: c.x2,
                y: c.y2,
            });
        }
    };
}
