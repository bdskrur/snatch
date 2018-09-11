import { FilterBase } from "./FilterBase";
import { computed, observable } from "mobx";

export abstract class SearchFilterBase<TValue> extends FilterBase<TValue> {
    @observable
    private input: string = "";

    @computed
    get searchInput() {
        return this.input;
    }

    set searchInput(input: string) {
        this.version++;
        this.input = input;
    }

    @computed
    public get isActive(): boolean {
        return this.input !== "";
    }
}
