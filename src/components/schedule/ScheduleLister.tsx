import {getScheduleForLine} from "../../data-services/schedule-information";
import {Stop} from "../../model/schedule/stop";

type Props = {
    selectedLine: number,
    startingPoint: string
}

export function ScheduleLister(props: Props) {
    const schedule = getScheduleForLine("" + props.selectedLine)
    const startingPoint = schedule.stops.filter(stop => stop.name === props.startingPoint)[0] || schedule.stops[0]

    return (
        <div className="w-full bg-white dark:bg-slate-600 mt-2 p-3 rounded-md">
            <h1 className="font-bold">{props.selectedLine} megállók</h1>
            {schedule.stops.map((item: Stop) =>
                <div key={item.name} className="flex w-full justify-between">
                    <div className={`${item.name === schedule.startsFrom.name ? 'underline' : ''}
                                     ${item.name === startingPoint.name ? 'font-bold' : ''}`}>
                        {item.name}
                    </div>
                    <div>{item.timeFromStart - startingPoint.timeFromStart}</div>
                </div>
            )}
        </div>
    )
}