import * as React from "react";
import Icon from "retail-ui/components/Icon/Icon";
import cn from "./DeleteButton.css";
import { observer } from "mobx-react";

interface IProps {
    onClick: () => void;
}

@observer
export class DeleteButton extends React.Component<IProps> {
    public render() {
        return (
            <button className={cn("button")} onClick={this.props.onClick}>
                <Icon name={"Delete"} />
            </button>
        );
    }
}
