import {Line} from "../model/schedule/line";
import {Stop} from "../model/schedule/stop";
import {Schedule} from "../model/schedule/schedule";


export function getScheduleForLine(lineIdentifier: string): Schedule {
    if (lineIdentifier === "15") {
        return new Schedule(new Line("15"), [
            new Stop("Doberdó utca",0),
            new Stop("Árpád Vezér Általános Iskola", 2),
            new Stop("Burgundia utca", 19),
            new Stop("Vágóhíd utca", 27),
            new Stop("Borzán Gáspár utca", 32),
            new Stop("Wolaffka utca", 33),
            new Stop("Málna utca", 36),
        ]);
    } else if (lineIdentifier === "15Y") {
        return new Schedule(new Line("15Y"), [
            new Stop("Doberdó utca", 0),
            new Stop("Árpád Vezér Általános Iskola", 2),
            new Stop("Burgundia utca", 19),
            new Stop("Vágóhíd utca", 27),
            new Stop("Borzán Gáspár utca", 32),
            new Stop("Lahner utca", 33),
            new Stop("Bayk András utca", 38),
        ]);
    }
    return new Schedule(new Line("Error"), []);
}