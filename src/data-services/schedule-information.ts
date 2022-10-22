import {Line} from "../model/schedule/line";
import {Stop} from "../model/schedule/stop";
import {Schedule} from "../model/schedule/schedule";
import {StartTimes} from "../model/schedule/start-times";


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
        ], [
            new StartTimes(4, [32]),
            new StartTimes(5, [16, 56]),
            new StartTimes(6, [10, 56]),
            new StartTimes(7, [10]),
        ], new Stop("Doberdó utca", 0));
    } else if (lineIdentifier === "15Y") {
        return new Schedule(new Line("15Y"), [
            new Stop("Doberdó utca", 0),
            new Stop("Árpád Vezér Általános Iskola", 2),
            new Stop("Burgundia utca", 19),
            new Stop("Vágóhíd utca", 27),
            new Stop("Borzán Gáspár utca", 32),
            new Stop("Lahner utca", 33),
            new Stop("Bayk András utca", 38),
        ], [
            new StartTimes(4, [58]),
            new StartTimes(5, [38]),
            new StartTimes(6, [40]),
            new StartTimes(7, [40]),
        ], new Stop("Doberdó utca", 0));
    }
    return new Schedule(new Line("Error"), [], [], new Stop("Error", 0));
}