import * as React from "react";
import cn from "./SideTabsButton.css";
import Gapped from "retail-ui/components/Gapped/Gapped";
import { SideTabButton } from "./SideTabButton/SideTabButton";
import { ISideTabButton } from "../../../models/ISideTabButton";
import { action, observable } from "mobx";
import { observer } from "mobx-react";

interface IProps {
    tabs: ISideTabButton[];
}

@observer
export class SideTabsButton extends React.Component<IProps> {
    public render() {
        return (
            <div className={cn("wrap")}>
                <Gapped vertical={true} gap={0}>
                    {this.renderButtons()}
                </Gapped>
            </div>
        );
    }

    @action
    public setActiveTabButtonName = (name: string) => {
        this.activeTabButtonName = name;
    };

    @observable
    private activeTabButtonName: string = "App Packages";

    private tabButtonOnClick = (tab: ISideTabButton) => {
        this.setActiveTabButtonName(tab.name);
        tab.onClick();
    };

    private renderButtons() {
        const { tabs } = this.props;

        return tabs.map((tab, i) => (
            <SideTabButton
                tab={tab}
                key={i}
                active={tab.name === this.activeTabButtonName}
                onClick={this.tabButtonOnClick.bind(this, tab)}
            />
        ));
    }
}
