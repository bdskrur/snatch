import * as React from "react";
import cn from "./PageColumn.css";
import Gapped from "retail-ui/components/Gapped/Gapped";

export class PageColumn extends React.Component {
    public render() {
        return (
            <div className={cn("column")}>
                <Gapped vertical={true} gap={20}>
                    {this.props.children}
                </Gapped>
            </div>
        );
    }
}
