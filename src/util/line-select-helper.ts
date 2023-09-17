import LineGrouping from "../model/line-info/line-grouping";


export class LineSelectHelper {
    private readonly _category: string;
    private readonly _value: string;
    private readonly _label: string;

    constructor(category: string, value: string, label: string) {
        this._category = category;
        this._value = value;
        this._label = label;
    }

    get category(): string {
        return this._category;
    }

    get value(): string {
        return this._value;
    }

    get label(): string {
        return this._label;
    }

    public static getLineSelectList(): Array<LineSelectHelper> {
        const linesSelectList: Array<LineSelectHelper> = [];
        [...LineGrouping.entries()].forEach(category => {
            [...category[1]].forEach(line =>
                linesSelectList.push(new LineSelectHelper(category[0], line[0], line[1].join())));
        });
        return linesSelectList;
    }
}