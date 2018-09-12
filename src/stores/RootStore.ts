import { AppStore } from "./AppStore";
import { TopBarStore } from "./TopBarStore";
import { SnatchGeneratorStore } from "./SnatchGeneratorStore";

export class RootStore {
    public appStore: AppStore;
    public topBarStore: TopBarStore;
    public snatchGeneratorStore: SnatchGeneratorStore;

    constructor() {
        this.appStore = new AppStore();
        this.topBarStore = new TopBarStore();
        this.snatchGeneratorStore = new SnatchGeneratorStore();
    }
}
