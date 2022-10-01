import LineGrouping from "../model/line-info/line-grouping";


export class LineSelectHelper {
    private readonly _isCategory: boolean;
    private readonly _value: string;
    private readonly _label: string;

    constructor(isCategory: boolean, value: string, label: string) {
        this._isCategory = isCategory;
        this._value = value;
        this._label = label;
    }

    get isCategory(): boolean {
        return this._isCategory;
    }

    get value(): string {
        return this._value;
    }

    get label(): string {
        return this._label;
    }

    public static getLineSelectList() {
        const linesSelectList: Array<LineSelectHelper> = [];
        [...LineGrouping.entries()].forEach(category => {
            linesSelectList.push(new LineSelectHelper(true, category[0], ""));
            [...category[1]].forEach(line =>
                linesSelectList.push(new LineSelectHelper(false, line[0], line[1].join())));
        });
        return linesSelectList;
    }
}