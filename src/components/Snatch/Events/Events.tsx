import * as React from "react";
import { Tabs } from "../../Tabs/Tabs";
import { inject, observer } from "mobx-react";
import { RootStore } from "../../../stores";

interface IProps {
    rootStore?: RootStore;
}

@inject("rootStore")
@observer
export class Events extends React.Component<IProps> {
    public render() {
        return (
            <div>
                <Tabs
                    tabs={this.snatchGeneratorStore.tabs}
                    value={this.snatchGeneratorStore.activeTabName}
                    onChange={this.snatchGeneratorStore.onChangeTab}
                />
                <div style={{ minHeight: 200, background: "#1f2d3c" }} />
            </div>
        );
    }

    private snatchGeneratorStore = this.props.rootStore!.snatchGeneratorStore;
}
