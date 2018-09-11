import * as React from "react";
import Input from "retail-ui/components/Input/Input";
import { InputProps } from "retail-ui/components/Input/Input";
import cn from "./NumberInput.css";
import Icon from "retail-ui/components/Icon/Icon";

// todo нуждается в рефакторинге
export class NumberInput extends React.Component<InputProps> {
    public render() {
        const { disabled, onChange, ...props } = this.props;
        return (
            <span className={cn("wrapper")}>
                <Input disabled={disabled} onChange={this.onInputChange} {...props} />
                {!disabled && (
                    <React.Fragment>
                        <div onClick={this.countUp} className={cn("arrowUp")}>
                            <Icon name={"ArrowChevronUp"} />
                        </div>
                        <div onClick={this.countDown} className={cn("arrowDown")}>
                            <Icon name={"ArrowChevronDown"} />
                        </div>
                    </React.Fragment>
                )}
            </span>
        );
    }

    private onInputChange = (e: any, val: string) => {
        const value = Number(val);
        if (this.props.onChange && !isNaN(value)) {
            this.props.onChange(e, value.toString());
        }
    };

    private countUp = (e: any) => {
        if (this.props.onChange && this.props.value) {
            this.props.onChange(e, (Number(this.props.value) + 1).toString());
        }
    };

    private countDown = (e: any) => {
        if (this.props.onChange && this.props.value) {
            this.props.onChange(e, (Number(this.props.value) - 1).toString());
        }
    };
}
