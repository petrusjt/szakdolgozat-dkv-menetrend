

export class Stop {
    get timeFromStart(): number {
        return this._timeFromStart;
    }
    get name(): string {
        return this._name;
    }
    private readonly _name: string;
    private readonly _timeFromStart: number;

    constructor(name: string, timeFromStart: number) {
        this._name = name;
        this._timeFromStart = timeFromStart;
    }
}