import { UPDATE_CACHE_PERIOD_MS } from "../constants";

export enum PeriodicalActionStartup {
    Immediate,
    Delayed,
}

export class PeriodicalAction {
    private readonly action: () => any;
    private readonly period: number;
    private readonly startup: PeriodicalActionStartup;

    private interval: number;

    constructor(
        action: () => any,
        period: number = UPDATE_CACHE_PERIOD_MS,
        startup: PeriodicalActionStartup = PeriodicalActionStartup.Immediate
    ) {
        this.action = action;
        this.period = period;
        this.startup = startup;
    }

    public start() {
        if (this.startup === PeriodicalActionStartup.Immediate) {
            this.action();
        }

        this.interval = window.setInterval(this.action, this.period);
    }

    public stop() {
        clearInterval(this.interval);
    }
}
