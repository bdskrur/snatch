import * as React from "react";
import { default as InternalCheckbox } from "retail-ui/components/Checkbox";
import cn from "./Checkbox.css";
import { CheckboxProps } from "retail-ui/components/Checkbox/Checkbox";

interface IProps extends CheckboxProps {
    title: string;
    onValueChange: (title: string, value: boolean) => void;
}

export class Checkbox extends React.Component<IProps> {
    public render() {
        const { title, onValueChange, ...props } = this.props;
        return (
            <InternalCheckbox onChange={this.onChange} {...props}>
                <span className={cn("title")}>{title}</span>
            </InternalCheckbox>
        );
    }

    private onChange = (_: any, value: boolean) => {
        this.props.onValueChange(this.props.title, value);
    };
}
