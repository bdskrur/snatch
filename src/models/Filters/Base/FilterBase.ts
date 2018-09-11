import { IFilter } from "./IFilter";
import { computed, observable } from "mobx";

export abstract class FilterBase<TValue> implements IFilter<TValue> {
    @observable
    private internalVersion = 0;
    @observable
    private active: boolean;

    protected constructor(active: boolean = false) {
        this.active = active;
    }

    @computed
    public get version() {
        return this.internalVersion;
    }

    public set version(version: number) {
        this.internalVersion = version;
    }

    public match = (value: TValue) => {
        return !this.isActive || this.abstractMatch(value);
    };

    @computed
    public get isActive() {
        return this.active;
    }

    public set isActive(active: boolean) {
        this.version++;
        this.active = active;
    }

    public abstract reset: () => void;

    protected abstract abstractMatch: (value: TValue) => boolean;
}
