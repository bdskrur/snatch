import { action, computed, observable } from "mobx";
import { PeriodicalAction } from "../utils/periodicalAction";
import { randomInteger } from "../utils/math";
import * as uuid from "uuid";
// import { getRandomColor } from "../utils/color";

const BET_CHANGE_VALUE = 30;
const BANK_CHANGE_VALUE = 100;

const MAX_SEGMENTS_COUNT = 3;

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
        return this.players
            .map(people => people.cash)
            .reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue), 0);
    }
    @computed
    public get maxCapitalPlayer(): number {
        return this.players.sort((a, b) => (a.cash > b.cash ? -1 : 1))[0].cash;
    }
    @computed
    public get minCapitalPlayer(): number {
        return this.players.sort((a, b) => (a.cash > b.cash ? 1 : -1))[0].cash;
    }

    @computed
    public get playersPie(): ICapitalSegment[] {
        if (this.players.length < 4) {
            return [];
        }

        let segments = [];
        const segmentsCount = MAX_SEGMENTS_COUNT;
        const segmentStep = (this.maxCapitalPlayer - this.minCapitalPlayer) / segmentsCount;

        for (let i = 1; i <= segmentsCount; i++) {
            const playersS = this.players.filter(
                player => player.cash <= i * segmentStep && player.cash > (i === 1 ? 0 : (i - 1) * segmentStep)
            );
            segments.push({
                color: "",
                key: `${i}`,
                value: playersS.length,
            });
        }
        segments = segments.filter(segment => segment.value);
        return segments.length < 2 ? [] : segments;

        // return segments;
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
            name: uuid.v4(),
            id: uuid.v4(),
            cash: randomInteger(1, 10000),
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

        if (randomInteger(1, 10) < 8) {
            this.addRandomPeople();
        }
        if (randomInteger(1, 10) < 2) {
            this.removeRandomPeople();
        }
        if (randomInteger(1, 10) < 5) {
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

    @action
    public sendBet = () => {
        this.peoples.push({
            name: uuid.v4(),
            id: uuid.v4(),
            cash: Number(this.myBet),
            bet: {
                value: 30,
                prediction: 30,
            },
        });
        this.myBet = 0;
    };

    public addPeopleAction: PeriodicalAction = new PeriodicalAction(this.addPeople, 1000);
}
