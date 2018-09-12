import * as React from "react";
import cn from "./SvgChart.css";
import { CHART_POINTS_AMOUNT } from "../../constants";

export enum Strokes {
    Common = "#2aa76d",
    Warning = "#2aa76d",
    Dangerous = "#2aa76d",
}

interface IProps {
    width?: number;
    height?: number;
    limit?: number;
    pointsAmount?: number;
    data: number[];
}

interface IPoint {
    x: number;
    y: number;
}

export class SvgChart extends React.Component<IProps> {
    private svgElement: SVGSVGElement | null;

    private points: IPoint[];

    private stroke: string;

    public render() {
        const { height, width, data, limit } = this.props;
        const maxBorder = limit || this.getMaxBorder(data);
        const limitData = data.map(item => (item > maxBorder ? maxBorder : item));
        this.drawGraphic(limitData, maxBorder);
        const svgPoints = this.points.map(currentValue => `${currentValue.x},${currentValue.y}`).join(" ");
        return (
            <div>
                <svg
                    width={width || "100%"}
                    height={height || "100%"}
                    version="1.1"
                    className={cn("svgChart")}
                    ref={svg => (this.svgElement = svg)}>
                    <defs>
                        <filter id="f1" x="0" y="0" width="200%" height="200%">
                            <feOffset result="shape1" in="SourceGraphic" dx="0" dy="4" />
                        </filter>
                    </defs>

                    <polyline
                        points={svgPoints}
                        style={{ fill: "none", stroke: this.stroke, strokeWidth: 1 }}
                        filter={this.points.every(point => point.y === this.points[0].y) ? "" : "url(#f1)"}
                    />
                </svg>
            </div>
        );
    }

    private drawGraphic(data: number[], maxBorder: number) {
        const { height, width, pointsAmount } = this.props;
        const w = width || (this.svgElement as SVGSVGElement).clientWidth;
        const h = height || (this.svgElement as SVGSVGElement).clientHeight;
        this.points = this.getPoints(data, maxBorder, w, h, pointsAmount);
        this.stroke = this.getStroke(data[data.length - 1], maxBorder);
    }

    private getPoints(
        data: number[],
        maxBorder: number,
        width: number,
        height: number,
        pointsAmount?: number
    ): IPoint[] {
        const factor = !maxBorder ? 0 : height / maxBorder;
        const pointsCount = pointsAmount || CHART_POINTS_AMOUNT;
        const step = width / pointsCount;

        let x = 0;
        const points = [];

        for (const item of data) {
            const y = height - item * factor;
            const point: IPoint = { x: Math.round(x), y: Math.round(y) };
            x += step;
            points.push(point);
        }

        return points;
    }

    private getMaxBorder(data: number[]): number {
        return data.reduce((previousValue, currentValue) => {
            return previousValue < currentValue ? currentValue : previousValue;
        }, 0);
    }

    private getStroke(value: number, maxBorder: number): string {
        if (value > maxBorder * 0.9) {
            return Strokes.Dangerous;
        } else if (value > maxBorder * 0.8) {
            return Strokes.Warning;
        } else {
            return Strokes.Common;
        }
    }
}
