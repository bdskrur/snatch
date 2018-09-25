import { action, computed, observable } from "mobx";
import { PeriodicalAction } from "../utils/periodicalAction";
import { randomInteger } from "../utils/math";
import * as uuid from "uuid";
import { ISvgPieChartPie } from "../components/SvgPieChart/SvgPieChartPie";
import { ICapitalizationLegendItem } from "../components/Snatch/Capitalization/CapitalizationLegend";
import { ITab } from "../components/Tabs/Tabs";
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

const playersSegmentsStyles = [
    {
        fill: "rgba(42, 167, 109, 1)",
        fillPhantom: "rgba(42, 167, 109, .5)",
        stroke: "#243445",
    },
    {
        fill: "rgba(152, 152, 48, 1)",
        fillPhantom: "rgba(152, 152, 48, .5)",
        stroke: "#243445",
    },
    {
        fill: "rgba(115, 42, 42, 1)",
        fillPhantom: "rgba(115, 42, 42, .5)",
        stroke: "#243445",
    },
];

const playersVsPeoplesStyles = {
    peoples: {
        fill: "rgb(31, 45, 60)",
        stroke: "none",
    },
    players: {
        fill: "#136d9b",
        stroke: "none",
        strokeWidth: 2,
    },
};

export class SnatchGeneratorStore {
    @observable
    public peoples: IPeople[] = [];
    @computed
    public get players(): IPeople[] {
        return this.peoples.filter(people => people.bet);
    }
    @computed
    public get playersCapitalization(): number {
        return (this.playersCapitalizationPrev = this.players
            .map(people => people.cash)
            .reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue), 0));
    }
    public playersCapitalizationPrev: number = 0;
    // @computed
    // public get playersCapitalizationPrev(): number {
    //     if (this.players.length < 2) {
    //         return 0;
    //     }
    //     const value = this.players
    //         .map(people => people.cash)
    //         .slice(0, this.players.length - 2)
    //         .reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue), 0);
    //     console.log(value);
    //     return value;
    // }
    @computed
    public get maxCapitalPlayer(): number {
        const players = this.players.sort((a, b) => (a.cash > b.cash ? -1 : 1));
        return players.length ? players[0].cash : 0;
    }
    @computed
    public get minCapitalPlayer(): number {
        const players = this.players.sort((a, b) => (a.cash > b.cash ? 1 : -1));
        return players.length ? players[0].cash : 0;
    }

    @computed
    public get playersSegmentsPie(): ISvgPieChartPie[] {
        let segments = [];
        const segmentsCount = MAX_SEGMENTS_COUNT;
        const segmentStep = (this.maxCapitalPlayer - this.minCapitalPlayer) / segmentsCount;

        for (let i = 1; i <= segmentsCount; i++) {
            let playersS = this.players.filter(
                player =>
                    player.cash <= i * segmentStep + this.minCapitalPlayer &&
                    player.cash > (i === 1 ? 0 : (i - 1) * segmentStep + this.minCapitalPlayer)
            );
            if (this.players.length === 1 && i === 1) {
                playersS = this.players;
            }
            segments.push({
                fill: playersSegmentsStyles[i - 1].fill,
                stroke: playersSegmentsStyles[i - 1].stroke,
                value: playersS.length,
                strokeWidth: 3,
            });
        }
        segments = segments.filter(segment => segment.value);
        return segments.length < 2 ? [] : segments;
    }
    @computed
    public get playersSegmentsLegend(): ICapitalizationLegendItem[] {
        let segments = [];
        const segmentsCount = MAX_SEGMENTS_COUNT;
        const segmentStep = (this.maxCapitalPlayer - this.minCapitalPlayer) / segmentsCount;

        for (let i = 1; i <= segmentsCount; i++) {
            let playersS = this.players.filter(
                player =>
                    player.cash <= i * segmentStep + this.minCapitalPlayer &&
                    player.cash > (i === 1 ? 0 : (i - 1) * segmentStep + this.minCapitalPlayer)
            );
            if (this.players.length === 1 && i === 1) {
                playersS = this.players;
            }

            segments.push({
                from: Math.round(i === 1 ? 0 : (i - 1) * segmentStep + this.minCapitalPlayer),
                to: i * Math.round(segmentStep + this.minCapitalPlayer),
                color: playersSegmentsStyles[i - 1].fillPhantom,
                value: playersS.length,
            });
        }
        segments = segments.filter(segment => segment.value);
        return segments;
    }
    @computed
    public get playersVsPeoplesPie(): ISvgPieChartPie[] {
        const segments = [];

        segments.push({
            fill: playersVsPeoplesStyles.peoples.fill,
            stroke: playersVsPeoplesStyles.peoples.stroke,
            value: this.peoples.length,
        });
        segments.push({
            fill: playersVsPeoplesStyles.players.fill,
            stroke: playersVsPeoplesStyles.players.stroke,
            value: this.players.length,
        });

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

    public tabs: ITab[] = [
        {
            name: "nowGame",
            title: "Текущая игра",
        },
        {
            name: "historyGames",
            title: "История вкладов",
        },
    ];
    @observable
    public activeTabName: string = this.tabs[0]!.name;

    @action
    public onChangeTab = (name: string) => {
        this.activeTabName = name;
    };

    @computed
    public get timeLeft(): string {
        const min = Math.trunc((this.iterationMax - this.iteration - 1) / 60);
        const sec =
            String(this.iterationsInMinute).length === 1 ? `0${this.iterationsInMinute}` : this.iterationsInMinute;

        return `${min}:${sec}`;
    }

    @action
    private addRandomPlayer = () => {
        if (this.peoples.length < 2) {
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
            cash: randomInteger(30, 1000),
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
