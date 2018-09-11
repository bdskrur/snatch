import { AppStore } from "./AppStore";
import { TopBarStore } from "./TopBarStore";

export class RootStore {
    public appStore: AppStore;
    public topBarStore: TopBarStore;

    constructor() {
        this.appStore = new AppStore();
        this.topBarStore = new TopBarStore();
    }
}
