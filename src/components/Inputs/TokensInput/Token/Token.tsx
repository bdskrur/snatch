import * as React from "react";
import cn from "./Token.css";
import Gapped from "retail-ui/components/Gapped/Gapped";
import Icon from "retail-ui/components/Icon/Icon";

interface IProps {
    id: number;
    text: string;
    selected?: boolean;
    onClick?: (token: Token) => void;
    onDeleteBtnClick?: (token: Token) => void;
}

export class Token extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    public render() {
        const { selected, text } = this.props;
        return (
            <span className={cn({ token: true, selected })} onClick={this.onClick}>
                <Gapped gap={5} verticalAlign="middle">
                    <span>{text}</span>
                    <span onMouseDown={this.onDeleteBtnClick}>
                        <Icon size={15} name={"Delete"} />
                    </span>
                </Gapped>
            </span>
        );
    }

    private onDeleteBtnClick() {
        if (this.props.onDeleteBtnClick) {
            this.props.onDeleteBtnClick(this);
        }
    }

    private onClick() {
        if (this.props.onClick) {
            this.props.onClick(this);
        }
    }

    public getId() {
        return this.props.id;
    }
}
