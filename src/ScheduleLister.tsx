import {getScheduleForLine} from "./data-services/schedule-information";
import {Stop} from "./model/schedule/stop";

type Props = {
    selectedLine: number;
}

export function ScheduleLister(props: Props) {
    return (
        <div className="bg-white dark:bg-slate-600 mt-2 p-3 rounded-md">
            <h1 className="font-bold">{props.selectedLine} megállók</h1>
            {getScheduleForLine("" + props.selectedLine).stops.map((item: Stop) =>
                <div key={item.name} className="flex w-full justify-between">
                    <div>{item.name}</div>
                    <div>{item.timeFromStart}</div>
                </div>
            )}
        </div>
    )
}