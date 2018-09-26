import * as React from "react";
import cn from "./Events.css";
import Transition from "react-transition-group/Transition";

export interface IEvent {
    playerName: string;
    time: string;
    message: string;
}

interface IProps {
    data: IEvent;
    animation?: boolean;
}

export class Event extends React.Component<IProps> {
    public render() {
        // const { animation } = this.props;
        const { playerName, time, message } = this.props.data;
        const transitionStyles = {
            entering: { height: 0, padding: 0, margin: 0 },
            entered: { height: 50, paddingTop: 5, paddingBottom: 5, marginBottom: 10 },
        };

        return (
            <Transition timeout={200} in={true} appear={true}>
                {(state: string) => (
                    <div className={cn("event")} style={...transitionStyles[state]}>
                        <div className={cn("topContainer")}>
                            <div className={cn("playerName")}>{playerName}</div>
                            <div className={cn("time")}>{time}</div>
                        </div>
                        <div className={cn("message")}>{message}</div>
                    </div>
                )}
            </Transition>
        );
    }
}
