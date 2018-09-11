import * as React from "react";
import { Logotype } from "../Logotype/Logotype";
import cn from "./TopBar.css";
import Icon from "retail-ui/components/Icon/Icon";
import { RootStore } from "../../stores";
import { inject, observer } from "mobx-react";
import Link from "retail-ui/components/Link/Link";
import Gapped from "retail-ui/components/Gapped/Gapped";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import history from "../../utils/history";
import { getCorrectPath } from "../../utils/historyHelpers";

// TODO: Не показывать manage namespaces, если юзер не админ
// TODO: Показывать что-нибудь понятное, когда у юзера нет namespaces
// TODO: Сортировка при одном айтеме визуально лагает. Происходит это из-за того, что данные, по сути, не меняются от
// сортировки одного айтема. Нужно с этим что-то придумать.
@inject("rootStore")
@observer
export class TopBar extends React.Component<{ rootStore?: RootStore } & RouteComponentProps<any>> {
    private appStore = this.props.rootStore!.appStore;
    // private topBarStore = this.props.rootStore!.topBarStore;

    public render() {
        return (
            <div className={cn("wrap")}>
                <div className={cn("content")}>
                    <div className={cn("leftContainer")}>
                        {this.renderLogotype()}
                        {this.renderWidget()}
                        {this.renderLinks()}
                    </div>
                    <div className={cn("rightContainer")}>
                        <Gapped gap={20}>
                            {this.renderFeedback()}
                            {this.renderIconButton("HelpDot")}
                            {this.renderUser()}
                            <div className={cn("delimiter")} />
                            {this.renderSignOut()}
                        </Gapped>
                    </div>
                </div>
            </div>
        );
    }

    private renderLinks() {
        return this.props.rootStore!.appStore.pages.map((page, index) => (
            <NavLink
                key={index}
                to={page.name}
                className={cn("navigationButton")}
                activeClassName={cn("navigationButtonActive")}>
                {page.title}
            </NavLink>
        ));
    }

    private renderLogotype() {
        return (
            <Gapped gap={10}>
                <Logotype />
                <div className={cn("delimiter")} />
            </Gapped>
        );
    }

    private renderSignOut() {
        return (
            <span className={cn("signOut")}>
                <Link href={"./api/user/logout"}>Sign out</Link>
            </span>
        );
    }

    private renderUser() {
        return (
            <span className={cn("user")}>
                <span className={cn("userIcon")}>
                    <Icon name={"User"} />
                </span>
                <span className={cn("userName")}>{this.appStore.userInitials}</span>
            </span>
        );
    }

    private renderFeedback() {
        return (
            <span className={cn("feedback")}>
                <Link icon="CommentLite" onClick={this.goToFeedback}>
                    Feedback
                </Link>
            </span>
        );
    }

    private goToFeedback = () => {
        const path = getCorrectPath(history, "feedback");
        history.push(path);
    };

    // todo: пофиксить смещение DropDownMenu

    private renderWidget() {
        return (
            <div className={cn("widget")}>
                <span className={cn("widgetIcon")}>
                    <Icon name="ArrowChevronDown" />
                </span>
            </div>
        );
    }

    private renderIconButton(iconName: any) {
        return (
            <div className={cn("button")}>
                <Icon name={iconName} />
            </div>
        );
    }
}

export default withRouter(TopBar);
