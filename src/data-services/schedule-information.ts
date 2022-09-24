import {Line} from "../model/line";
import {Stop} from "../model/stop";


export function getScheduleForLine(lineIdentifier: string): Line {
    if (lineIdentifier === "15") {
        return new Line("15", [
            new Stop("Doberdó utca"),
            new Stop("Árpád Vezér Általános Iskola"),
            new Stop("Burgundia utca"),
            new Stop("Vágóhíd utca"),
            new Stop("Borzán Gáspár utca"),
            new Stop("Wolaffka utca"),
            new Stop("Málna utca"),
        ]);
    } else if (lineIdentifier === "15Y") {
        return new Line("15Y", [
            new Stop("Doberdó utca"),
            new Stop("Árpád Vezér Általános Iskola"),
            new Stop("Burgundia utca"),
            new Stop("Vágóhíd utca"),
            new Stop("Borzán Gáspár utca"),
            new Stop("Lahner utca"),
            new Stop("Bayk András utca"),
        ]);
    }
    return new Line("Error", []);
}