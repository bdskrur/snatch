import * as React from "react";
import cn from "./TitleForInput.css";
import Gapped from "retail-ui/components/Gapped/Gapped";
import Icon from "retail-ui/components/Icon/Icon";
import Tooltip from "retail-ui/components/Tooltip/Tooltip";
import { CSSProperties } from "react";

export interface IProps {
    title: string;
    hint?: string;
    style?: CSSProperties;
}

export class TitleForInput extends React.Component<IProps> {
    public render() {
        const { title, hint, style, children } = this.props;
        return (
            <Gapped vertical={true}>
                <div className={cn("titleContainer")}>
                    <span className={cn("inputTitle")}>
                        {title}{" "}
                        {hint && (
                            <Tooltip render={this.renderTooltip()} closeButton={true}>
                                {" "}
                                <Icon color={"#787878"} name={"HelpDot"} />{" "}
                            </Tooltip>
                        )}
                    </span>
                </div>
                <div style={style} className={cn("inputContainer")}>
                    {children}
                </div>
            </Gapped>
        );
    }

    private renderTooltip = () => {
        return () => <div style={{ maxWidth: 250 }}>{this.props.hint}</div>;
    };
}
