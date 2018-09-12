import { action, observable } from "mobx";
import { PeriodicalAction } from "../utils/periodicalAction";

export class SnatchGeneratorStore {
    @observable
    public peopleCount: number[] = [];

    @action
    private addPeople = () => {
        const value = Math.random() * 100;
        this.peopleCount.push(value);
    };

    public addPeopleAction: PeriodicalAction = new PeriodicalAction(this.addPeople, 1000);
}
