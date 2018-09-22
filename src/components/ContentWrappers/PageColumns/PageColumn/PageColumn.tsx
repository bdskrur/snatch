import * as React from "react";
import cn from "./PageColumn.css";
import Gapped from "retail-ui/components/Gapped/Gapped";

interface IProps {
    width?: number;
}

export class PageColumn extends React.Component<IProps> {
    public render() {
        const { width } = this.props;
        return (
            <div className={cn("column")} style={{ width }}>
                <Gapped vertical={true} gap={20}>
                    {this.props.children}
                </Gapped>
            </div>
        );
    }
}
