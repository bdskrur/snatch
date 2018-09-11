import * as React from "react";
import cn from "./Container.css";
import Gapped from "retail-ui/components/Gapped/Gapped";

export class ContainerBody extends React.Component {
    public render() {
        return (
            <div className={cn("containerBody")}>
                <Gapped vertical={true} gap={30}>
                    {this.props.children}
                </Gapped>
            </div>
        );
    }
}
