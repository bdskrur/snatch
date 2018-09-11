import * as React from "react";
import Gapped from "retail-ui/components/Gapped/Gapped";
import cn from "./InputsContainer.css";

interface IProps {
    title: string;
}

export class InputsContainer extends React.Component<IProps> {
    public render() {
        return (
            <Gapped vertical={true} gap={8}>
                <span className={cn("title")}>{this.props.title}</span>
                {this.props.children}
            </Gapped>
        );
    }
}
