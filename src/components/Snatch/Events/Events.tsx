import * as React from "react";
import { inject, observer } from "mobx-react";
import { RootStore } from "../../../stores";

interface IProps {
    rootStore?: RootStore;
}

@inject("rootStore")
@observer
export class Events extends React.Component<IProps> {
    public render() {
        return <div style={{ minHeight: 200, background: "#1f2d3c" }} />;
    }

    // private snatchGeneratorStore = this.props.rootStore!.snatchGeneratorStore;
}
