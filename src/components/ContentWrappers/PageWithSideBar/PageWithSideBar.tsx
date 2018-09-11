import * as React from "react";
import { SideBar } from "./SideBar/SideBar";
import { PagesBody } from "./PagesBody/PagesBody";
import { MainWrap } from "..";

export class PageWithSideBar extends React.Component {
    public static SideBar = SideBar;
    public static PageBody = PagesBody;

    public render() {
        return <MainWrap>{this.props.children}</MainWrap>;
    }
}
