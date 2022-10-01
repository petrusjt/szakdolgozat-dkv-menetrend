import {Line} from "./line";
import {Stop} from "./stop";


export class Schedule {
    get line(): Line {
        return this._line;
    }
    get stops(): Array<Stop> {
        return this._stops;
    }
    private readonly _line: Line;
    private readonly _stops: Array<Stop>;

    constructor(line: Line, stops: Array<Stop>) {
        this._line = line;
        this._stops = stops;
    }
}