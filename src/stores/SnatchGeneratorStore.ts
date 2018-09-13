import { action, observable } from "mobx";
import { PeriodicalAction } from "../utils/periodicalAction";

export class SnatchGeneratorStore {
    @observable
    public peopleGraph: number[] = [];
    @observable
    public peopleCount: number;
    @observable
    public playerGraph: number[] = [];
    @observable
    public playerCount: number;

    private iteration: number = 0;
    private iterationMax: number = 30;

    @action
    private addPeople = () => {
        if (this.iteration === this.iterationMax) {
            this.addPeopleAction.stop();
            return;
        }
        this.iteration++;
        if (!this.peopleCount && this.peopleCount !== 0) {
            this.peopleCount = 0;
            this.peopleGraph.push(this.peopleCount);
        } else {
            const value = Math.random() * 20;
            this.peopleGraph.push(value + this.peopleCount);
            this.peopleCount += value;
        }

        if (!this.playerCount && this.playerCount !== 0) {
            this.playerCount = 0;
            this.playerGraph.push(this.playerCount);
        } else {
            const value = Math.random() * 10;
            this.playerGraph.push(value + this.playerCount);
            this.playerCount += value;
        }
    };

    public addPeopleAction: PeriodicalAction = new PeriodicalAction(this.addPeople, 1000);
}
