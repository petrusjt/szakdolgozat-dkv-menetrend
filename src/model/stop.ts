import {Line} from "./line";


export class Stop {
    name: string;
    lines: Array<Line>;

    constructor(name: string,
                /*lines: Array<Line>*/) {
        this.name = name;
        this.lines = []/*lines*/;
    }
}