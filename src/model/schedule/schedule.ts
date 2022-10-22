import {Line} from "./line";
import {Stop} from "./stop";
import {StartTimes} from "./start-times";


export class Schedule {
    get startTimes(): Array<StartTimes> {
        return this._startTimes;
    }

    get line(): Line {
        return this._line;
    }

    get stops(): Array<Stop> {
        return this._stops;
    }

    get startsFrom(): Stop {
        return this._startsFrom;
    }

    private readonly _line: Line;
    private readonly _stops: Array<Stop>;
    private readonly _startTimes: Array<StartTimes>;
    private readonly _startsFrom: Stop;

    constructor(line: Line, stops: Array<Stop>, startTimes: Array<StartTimes>, startsFrom: Stop) {
        this._line = line;
        this._stops = stops;
        this._startTimes = startTimes;
        this._startsFrom = startsFrom;
    }
}