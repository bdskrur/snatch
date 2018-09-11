import * as React from "react";
import cn from "./SideTabButton.css";
import { observer } from "mobx-react";
import { ISideTabButton } from "../../../../models/ISideTabButton";

interface IProps {
    tab: ISideTabButton;
    active: boolean;
    onClick: () => void;
}

@observer
export class SideTabButton extends React.Component<IProps> {
    public render() {
        const { tab, active, onClick } = this.props;
        const tabStyle = cn({
            tabButton: true,
            activeTabButton: active,
        });

        return (
            <div className={tabStyle} onClick={onClick}>
                <span className={cn("tabName")}>{tab.name}</span>
                <span className={cn("amount")}>{tab.amountApps}</span>
            </div>
        );
    }
}
