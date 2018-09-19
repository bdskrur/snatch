import { action, computed, observable } from "mobx";
import { PeriodicalAction } from "../utils/periodicalAction";
import { randomInteger } from "../utils/math";
import * as uuid from "uuid";
// import { getRandomColor } from "../utils/color";

const BET_CHANGE_VALUE = 30;
const BANK_CHANGE_VALUE = 100;

interface IPlayer {
    key: string;
    value: number;
    color: string;
}

export class SnatchGeneratorStore {
    @observable
    public peopleGraph: number[] = [];
    @observable
    public peopleCount: number;
    @observable
    public playerGraph: number[] = [];
    @observable
    public players: IPlayer[] = [];
    @observable
    public playerCount: number;
    @observable
    public bank: number;

    @observable
    public myBet: number = 30;
    @observable
    public myPrediction: number = 0;

    @observable
    public iteration: number = 0;
    @observable
    public iterationMax: number = 600;
    @observable
    public iterationsInMinute: number = 60;

    @observable
    public playersPie: number[] = [];

    @computed
    public get timeLeft(): string {
        const min = Math.trunc((this.iterationMax - this.iteration - 1) / 60);
        const sec =
            String(this.iterationsInMinute).length === 1 ? `0${this.iterationsInMinute}` : this.iterationsInMinute;

        return `${min}:${sec}`;
    }

    @action
    private addPeople = () => {
        if (this.iterationsInMinute === 0) {
            this.iterationsInMinute = 59;
        } else {
            this.iterationsInMinute = this.iterationsInMinute - 1;
        }

        if (this.iteration === this.iterationMax) {
            this.addPeopleAction.stop();
            return;
        }
        this.iteration++;

        if (!this.playerCount && this.playerCount !== 0) {
            this.playerCount = 0;
            this.playerGraph.push(this.playerCount);
        } else {
            const value = randomInteger(0, 2);
            this.playerGraph.push(value + this.playerCount);
            this.playerCount += value;
            for (let i = 0; i < value; i++) {
                const sumBet = randomInteger(30, 1000);
                this.bank += sumBet;

                this.players.push({
                    key: uuid.v1(),
                    value: sumBet,
                    color: "",
                });

                this.playersPie = [...this.playersPie, sumBet];
            }
        }

        if (!this.peopleCount && this.peopleCount !== 0) {
            this.peopleCount = 0;
            this.peopleGraph.push(this.peopleCount);
        } else {
            const value = randomInteger(this.playerCount, this.playerCount + randomInteger(0, 5));
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
