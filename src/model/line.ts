import {Stop} from "./stop";


export class Line {
    identifier: string;
    stops: Array<Stop>;

    constructor(identifier: string,
                stops: Array<Stop>) {
        this.identifier = identifier;
        this.stops = stops;
    }
}