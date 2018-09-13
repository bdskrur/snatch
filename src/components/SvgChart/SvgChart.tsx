import * as React from "react";
import cn from "./SvgChart.css";

const CHART_POINTS_AMOUNT = 30;

// export enum Strokes {
//     Common = "#2aa76d",
//     Warning = "#2aa76d",
//     Dangerous = "#2aa76d",
// }

interface IGraphModel {
    data: number[];
    stroke: string;
    polygonFill?: string;
}

interface IGraphViewModel {
    points: IPoint[];
    stroke: string;
    polygonFill?: string;
}

interface IGraphSVGModel {
    points: string;
    stroke: string;
    polygonPoints: string;
    polygonFill?: string;
}

interface IProps {
    width?: number;
    height?: number;
    limit?: number;
    pointsAmount?: number;
    models: IGraphModel[];
}

interface IPoint {
    x: number;
    y: number;
}

export class SvgChart extends React.Component<IProps> {
    private svgElement: SVGSVGElement | null;

    // private points: IPoint[];

    // private stroke: string;

    public render() {
        const { height, width, limit, models } = this.props;
        const maxBorder = limit || this.getMaxBorder(models);
        const graphs = this.drawGraphic(models, maxBorder);
        const graphsSVG: IGraphSVGModel[] = [];
        for (const graph of graphs) {
            const points = graph.points.map(currentValue => `${currentValue.x},${currentValue.y}`).join(" ");
            graphsSVG.push({
                points,
                polygonPoints: points + ` ${graph.points[graph.points.length - 1].x},${height} 0,${height}`,
                stroke: graph.stroke,
                polygonFill: graph.polygonFill,
            });
        }
        // const polylinePoints = this.points.map(currentValue => `${currentValue.x},${currentValue.y}`).join(" ");
        // const poligonPoints = polylinePoints + ` ${this.points[this.points.length - 1].x},${height} 0,${height}`;
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

                    {graphsSVG.map(graph => (
                        <g>
                            <polyline
                                points={graph.points}
                                style={{ fill: "none", stroke: graph.stroke, strokeWidth: 1 }}
                            />
                            <polygon
                                className={cn({ polygon: true, polygonFixedFill: graph.polygonFill })}
                                points={graph.polygonPoints}
                                style={{ fill: graph.polygonFill ? graph.polygonFill : graph.stroke, stroke: "none" }}
                            />
                        </g>
                    ))}
                </svg>
            </div>
        );
    }

    private drawGraphic(data: IGraphModel[], maxBorder: number) {
        const { height, width, pointsAmount } = this.props;
        const w = width || (this.svgElement as SVGSVGElement).clientWidth;
        const h = height || (this.svgElement as SVGSVGElement).clientHeight;
        const graphs: IGraphViewModel[] = [];
        for (const graph of data) {
            graphs.push({
                points: this.getPoints(graph.data, maxBorder, w, h, pointsAmount),
                stroke: graph.stroke,
                polygonFill: graph.polygonFill,
            });
        }
        return graphs;
        // this.stroke = this.getStroke(data[data.length - 1], maxBorder);
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

    private getMaxBorder(data: IGraphModel[]): number {
        return data
            .map(item =>
                item.data.reduce((previousValue, currentValue) => {
                    return previousValue < currentValue ? currentValue : previousValue;
                }, 0)
            )
            .sort((a, b) => (a < b ? 1 : -1))[0];
        // return data.reduce((previousValue, currentValue) => {
        //     return previousValue < currentValue ? currentValue : previousValue;
        // }, 0);
    }

    // private getStroke(value: number, maxBorder: number): string {
    //     if (value > maxBorder * 0.9) {
    //         return Strokes.Dangerous;
    //     } else if (value > maxBorder * 0.8) {
    //         return Strokes.Warning;
    //     } else {
    //         return Strokes.Common;
    //     }
    // }
}
