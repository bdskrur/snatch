import * as React from "react";
import cn from "./BaseInput.css";

export class BaseInput extends React.Component {
    public render() {
        return <input className={cn("input")} />;
    }
}
