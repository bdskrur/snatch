import * as React from "react";
import Toggle from "retail-ui/build/components/Toggle/Toggle";
import cn from "./ToggleButton.css";
import { ToggleProps } from "retail-ui/components/Toggle";

export class ToggleButton extends React.Component<ToggleProps> {
    public render() {
        return (
            <div className={cn("wrap")}>
                <Toggle {...this.props} />
                <span className={cn("status")}>{this.props.children}</span>
            </div>
        );
    }
}
