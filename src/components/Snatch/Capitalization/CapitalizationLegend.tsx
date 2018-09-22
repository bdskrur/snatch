import * as React from "react";
import cn from "./Capitalization.css";

export interface ICapitalizationLegendItem {
    from: number;
    to: number;
    value: number;
    color: string;
}

interface IProps {
    data: ICapitalizationLegendItem[];
}

export class CapitalizationLegend extends React.Component<IProps> {
    public render() {
        const { data } = this.props;

        return <div className={cn("legend")}>{data.map(item => this.renderItem(item))}</div>;
    }

    private renderItem = (item: ICapitalizationLegendItem) => {
        return (
            <div className={cn("legendItem")}>
                <div style={{ background: item.color }} className={cn("legendItemColor")}>
                    {item.value}
                </div>
                <div className={cn("legendItemText")}>
                    игрок
                    {item.value === 1 ? "" : "ов"} с депозитом от {this.renderCoast(item.from)} до{" "}
                    {this.renderCoast(item.to)}
                </div>
            </div>
        );
    };

    private renderCoast(value: number) {
        return <p className={cn("coast")}>{value}</p>;
    }
}
