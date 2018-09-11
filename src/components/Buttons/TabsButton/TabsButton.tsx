import * as React from "react";
import cn from "./TabsButton.css";
import { ITabButton } from "../../../models/ITabButton";
import Gapped from "retail-ui/components/Gapped/Gapped";
import { action, observable } from "mobx";
import { TabButton } from "./TabButton/TabButton";
import { observer } from "mobx-react";

interface IProps {
    tabs: ITabButton[];
    title?: string;
    defaultActiveIndex?: number;
}

@observer
export class TabsButton extends React.Component<IProps> {
    public render() {
        return (
            <div className={cn("wrap")}>
                <Gapped gap={15}>
                    {this.renderTitle()}
                    {this.renderButtons()}
                </Gapped>
            </div>
        );
    }

    public componentDidMount() {
        const { defaultActiveIndex, tabs } = this.props;
        if (defaultActiveIndex !== undefined && defaultActiveIndex < tabs.length) {
            const tab = tabs[defaultActiveIndex];
            this.setActiveTabButtonName(tab.name);
            tab.onClick();
        }
    }

    @action
    public setActiveTabButtonName = (name: string) => {
        this.activeTabButtonName = name;
    };

    @observable
    private activeTabButtonName: string;

    private tabButtonOnClick = (tab: ITabButton) => {
        this.setActiveTabButtonName(tab.name);
        tab.onClick();
    };

    private renderButtons() {
        const { tabs } = this.props;

        return tabs.map((tab, i) => (
            <TabButton
                tab={tab}
                key={i}
                active={tab.name === this.activeTabButtonName}
                onClick={this.tabButtonOnClick.bind(this, tab)}
            />
        ));
    }

    private renderTitle() {
        const { title } = this.props;

        return title ? <span>{title}</span> : null;
    }
}
