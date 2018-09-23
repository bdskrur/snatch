import * as React from "react";
import { TabsTab } from "./TabsTab";
import cn from "./Tabs.css";

export interface ITab {
    name: string;
    title: string;
}

interface IProps {
    tabs: ITab[];
    value: string;
    onChange: (name: string) => void;
}

export class Tabs extends React.Component<IProps> {
    public render() {
        const { tabs, value, onChange } = this.props;

        return (
            <div className={cn("wrap")}>
                {tabs.map((tab, index) => (
                    <TabsTab
                        data={tab}
                        active={tab.name === value}
                        key={index}
                        onClick={onChange.bind(null, tab.name)}
                    />
                ))}
            </div>
        );
    }
}
