import * as React from "react";
import cn from "./PageColumns.css";
import Gapped from "retail-ui/components/Gapped/Gapped";
import { CSSProperties } from "react";

interface IProps {
    style?: CSSProperties;
}

export class PageColumnsColumn extends React.Component<IProps> {
    public render() {
        const { style } = this.props;
        return (
            <div className={cn("column")} style={style}>
                <Gapped vertical={true} gap={20}>
                    {this.props.children}
                </Gapped>
            </div>
        );
    }
}
