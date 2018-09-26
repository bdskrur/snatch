import * as React from "react";
import { inject, observer } from "mobx-react";
import { RootStore } from "../../../stores";
import { Event } from "./Event";
import cn from "./Events.css";

interface IProps {
    rootStore?: RootStore;
}

@inject("rootStore")
@observer
export class Events extends React.Component<IProps> {
    public componentWillUpdate(nextProps: IProps) {
        console.log(nextProps.rootStore!.snatchGeneratorStore.eventsView);
    }

    public render() {
        return (
            <div className={cn("events")}>
                {this.snatchGeneratorStore.eventsView.map(x => (
                    <Event data={x} />
                ))}
            </div>
        );
    }

    private snatchGeneratorStore = this.props.rootStore!.snatchGeneratorStore;
}
