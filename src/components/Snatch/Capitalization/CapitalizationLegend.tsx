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
                <div style={{ background: item.color }} className={cn("legendItemColor")} />
                <div className={cn("legendItemText")}>
                    игроки с депозитом от {item.from} до {item.to}
                </div>
            </div>
        );
    };
}
