import { action, computed, observable } from "mobx";
import { PeriodicalAction } from "../utils/periodicalAction";
import { randomInteger } from "../utils/math";
import * as uuid from "uuid";
import { generateName } from "../utils/names";
// import { getRandomColor } from "../utils/color";

const BET_CHANGE_VALUE = 30;
const BANK_CHANGE_VALUE = 100;

const MAX_SEGMENTS_COUNT = 5;

interface IPeople {
    name: string;
    id: string;
    cash: number;
    bet?: IBet;
}

interface IBet {
    value: number;
    prediction: number;
}

interface ICapitalSegment {
    color: string;
    value: number;
    key: string;
}

export class SnatchGeneratorStore {
    @observable
    public peoples: IPeople[] = [];
    @computed
    public get players(): IPeople[] {
        return this.peoples.filter(people => people.bet);
    }
    @computed
    public get playersCapitalization(): number {
        return this.peoples
            .filter(people => people.bet)
            .map(people => people.cash)
            .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }

    @computed
    public get playersPie(): ICapitalSegment[] {
        const segments = [];
        const segmentsCount = this.players.length <= MAX_SEGMENTS_COUNT ? this.players.length - 1 : MAX_SEGMENTS_COUNT;
        const segmentStep = this.playersCapitalization / segmentsCount;
        for (let i = 1; i <= segmentsCount; i++) {
            segments.push({
                color: "",
                key: `${i}`,
                value: this.players
                    .filter(player => player.cash < i * segmentStep)
                    .map(people => people.cash)
                    .reduce((previousValue, currentValue) => previousValue + currentValue, 0),
            });
        }
        return segments;
    }

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

    @computed
    public get timeLeft(): string {
        const min = Math.trunc((this.iterationMax - this.iteration - 1) / 60);
        const sec =
            String(this.iterationsInMinute).length === 1 ? `0${this.iterationsInMinute}` : this.iterationsInMinute;

        return `${min}:${sec}`;
    }

    @action
    private addRandomPlayer = () => {
        if (this.peoples.length < 3) {
            return;
        }

        const peopleIndex = randomInteger(0, this.peoples.length - 1);

        if (!this.peoples[peopleIndex].bet) {
            const bet = randomInteger(30, this.peoples[peopleIndex].cash);

            this.peoples[peopleIndex].bet = {
                value: bet,
                prediction: randomInteger(this.players.length * 30 + bet, this.playersCapitalization),
            };
        }
    };

    @action
    private addRandomPeople = () => {
        this.peoples.push({
            name: generateName(),
            id: uuid.v4(),
            cash: randomInteger(30, 500000),
        });
    };

    @action
    private removeRandomPeople = () => {
        if (this.peoples.length === 0) {
            return;
        }

        const peopleIndex = randomInteger(0, this.peoples.length - 1);

        if (!this.peoples[peopleIndex].bet) {
            this.peoples.splice(peopleIndex, 1);
        }
    };

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

        if (randomInteger(1, 10) < 5) {
            this.addRandomPeople();
        }
        if (randomInteger(1, 10) < 2) {
            this.removeRandomPeople();
        }
        if (randomInteger(1, 10) < 3) {
            this.addRandomPlayer();
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
