import * as React from "react";
import Input from "retail-ui/components/Input/Input";
import Icon from "retail-ui/components/Icon/Icon";
import cn from "./SearchInput.css";

interface IProps {
    value: string;
    onValueChange: (value: string) => void;
    width?: number;
    placeholder?: string;
}

export class SearchInput extends React.Component<IProps, {}> {
    public render() {
        return (
            <div className={cn("wrap")}>
                <Input
                    value={this.props.value}
                    rightIcon={<Icon name="Search" />}
                    placeholder={this.props.placeholder ? this.props.placeholder : "Search"}
                    width={this.props.width ? `${this.props.width}px` : "100%"}
                    onChange={this.onChange}
                />
            </div>
        );
    }

    private onChange = (_: any, value: string) => {
        this.props.onValueChange(value);
    };
}
