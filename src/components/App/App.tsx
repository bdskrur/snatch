import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";
import cn from "./App.css";
import { Route } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import TopBar from "../TopBar/TopBar";
import { MainPage } from "../../pages/MainPage/MainPage";

@observer
export class App extends Component<RouteComponentProps<any>> {
    public render() {
        return (
            <div className={cn("app")}>
                <TopBar />

                <Route exact={true} path={"/"} render={this.renderRedirect} />

                <Route exact={false} path={"/main"} component={MainPage} />
            </div>
        );
    }

    private renderRedirect = () => {
        return <Redirect to={"/main"} />;
    };
}

export default withRouter(App);
