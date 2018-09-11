import "./utils/upgrades";
import { configure } from "mobx";
import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App/App";
import "./styles/index.css";
import { RootStore } from "./stores";
// import {BrowserRouter as Router} from "react-router-dom";
import { Router } from "react-router-dom";
import history from "./utils/history";

configure({ enforceActions: __FAKE_API__ });

const ROOT_STORE = new RootStore();

ReactDOM.render(
    <Router history={history}>
        <Provider rootStore={ROOT_STORE}>
            <App />
        </Provider>
    </Router>,
    document.getElementById("root") as HTMLElement
);
