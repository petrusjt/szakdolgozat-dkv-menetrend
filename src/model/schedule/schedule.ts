import {Route} from "./route";
import {Stop} from "./stop";
import {StartTimes} from "./start-times";


export class Schedule {
    get startTimes(): Array<StartTimes> {
        return this._startTimes;
    }

    get line(): Route {
        return this._line;
    }

    get stops(): Array<Stop> {
        return this._stops;
    }

    get startsFrom(): Stop {
        return this._startsFrom;
    }

    private readonly _line: Route;
    private readonly _stops: Array<Stop>;
    private readonly _startTimes: Array<StartTimes>;
    private readonly _startsFrom: Stop;

    constructor(line: Route, stops: Array<Stop>, startTimes: Array<StartTimes>, startsFrom: Stop) {
        this._line = line;
        this._stops = stops;
        this._startTimes = startTimes;
        this._startsFrom = startsFrom;
    }
}