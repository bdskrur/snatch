import * as React from "react";
import { ITab } from "./Tabs";
import cn from "./Tabs.css";

interface IProps {
    data: ITab;
    active: boolean;
    onClick: () => void;
}

export class TabsTab extends React.Component<IProps> {
    public render() {
        const { data, active, onClick } = this.props;

        return (
            <div onClick={onClick} className={cn({ tab: true, tabActive: active })}>
                {data.title}
            </div>
        );
    }
}
