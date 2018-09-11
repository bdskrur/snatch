import * as React from "react";
import { ITabButton } from "../../../../models/ITabButton";
import cn from "./TabButton.css";
import { observer } from "mobx-react";

interface IProps {
    tab: ITabButton;
    active: boolean;
    onClick: () => void;
}

@observer
export class TabButton extends React.Component<IProps> {
    public render() {
        const { tab, active, onClick } = this.props;
        const tabStyle = cn({
            tabButton: true,
            tabButtonActive: active,
        });

        return (
            <span className={tabStyle} onClick={onClick}>
                {tab.name}
            </span>
        );
    }
}
