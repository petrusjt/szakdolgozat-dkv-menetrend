

export class StartTimes {
    get hour(): Number {
        return this._hour;
    }

    get minutes(): Array<number> {
        return this._minutes;
    }
    private readonly _hour: Number;
    private readonly _minutes: Array<number>;

    constructor(hour: Number, minutes: Array<number>) {
        this._hour = hour;
        this._minutes = minutes;
    }
}