import * as React from "react";
import cn from "./PagesBody.css";
import * as Sticky from "react-stickynode";

export class PagesBody extends React.Component {
    public render() {
        return (
            <div className={cn("wrap")}>
                <div className={cn("content")}>
                    <Sticky>{this.props.children}</Sticky>
                </div>
            </div>
        );
    }
}
