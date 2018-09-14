import * as React from "react";
import cn from "./BaseInput.css";

interface IProps {
    value: string | number;
    onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

export class BaseInput extends React.Component<IProps> {
    public render() {
        const { onChange, value } = this.props;
        return <input className={cn("input")} onChange={onChange} value={value} />;
    }
}
