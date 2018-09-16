import { action, observable } from "mobx";
import { PeriodicalAction } from "../utils/periodicalAction";
import { randomInteger } from "../utils/math";

const BET_CHANGE_VALUE = 30;
const BANK_CHANGE_VALUE = 100;

export class SnatchGeneratorStore {
    @observable
    public peopleGraph: number[] = [];
    @observable
    public peopleCount: number;
    @observable
    public playerGraph: number[] = [];
    @observable
    public playerCount: number;
    @observable
    public bank: number;

    @observable
    public myBet: number = 30;
    @observable
    public myPrediction: number = 0;

    private iteration: number = 0;
    private iterationMax: number = 600;

    @action
    private addPeople = () => {
        if (this.iteration === this.iterationMax) {
            this.addPeopleAction.stop();
            return;
        }
        this.iteration++;

        if (!this.playerCount && this.playerCount !== 0) {
            this.playerCount = 0;
            this.playerGraph.push(this.playerCount);
        } else {
            const value = randomInteger(1, 5);
            this.playerGraph.push(value + this.playerCount);
            this.playerCount += value;
            for (let i = 0; i < value; i++) {
                this.bank += randomInteger(30, 1000);
            }
        }

        if (!this.peopleCount && this.peopleCount !== 0) {
            this.peopleCount = 0;
            this.peopleGraph.push(this.peopleCount);
        } else {
            const value = randomInteger(this.playerCount, this.playerCount + 100);
            this.peopleGraph.push(value);
            this.peopleCount = value;
        }
    };

    @action
    public onChangeMyBet = (e: any) => {
        this.myBet = e.target.value;
    };

    @action
    public incrementMyBet = () => {
        this.myBet += BET_CHANGE_VALUE;
    };

    @action
    public decrementMyBet = () => {
        this.myBet -= BET_CHANGE_VALUE;
    };

    @action
    public onChangeMyPrediction = (e: any) => {
        this.myPrediction = e.target.value;
    };

    @action
    public incrementMyPrediction = () => {
        this.myPrediction += BANK_CHANGE_VALUE;
    };

    @action
    public decrementMyPrediction = () => {
        this.myPrediction -= BANK_CHANGE_VALUE;
    };

    public sendBet = () => {
        // sd
    };

    public addPeopleAction: PeriodicalAction = new PeriodicalAction(this.addPeople, 1000);
}
