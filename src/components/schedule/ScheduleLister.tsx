import {Stop} from "src/model/schedule/stop";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Schedule} from "src/model/schedule/schedule";
import {StartTimes} from "src/model/schedule/start-times";
import {Route} from "src/model/schedule/route";
import {StartingPointSelector} from "src/components/schedule/subcomponents/StartingPointSelector";

export function ScheduleLister() {
    const params = useParams()
    const [isReverse, setReverse] = useState(params["reverse"] === "reverse")
    const lineId = params["lineId"] as string
    const defaultScheduleInfo = new Schedule(new Route("Error"), [new Stop("Error", 0)], [], new Stop("Error", 0))
    const [scheduleInfo, setScheduleInfo] = useState(defaultScheduleInfo)
    const [scheduleAtSelectedStop, setScheduleAtSelectedStop] = useState(scheduleInfo)
    const [startingPoint, setStartingPoint] = useState(scheduleInfo.startsFrom)

    useEffect(() => {
        // BASE_REST_PATH comes from public/config.js
        // @ts-ignore
        fetch(`${BASE_REST_PATH}/${lineId}/${isReverse ? 'REVERSE' : 'NORMAL'}`)
            .then(res => res.json())
            .then(data => {
                setScheduleInfo(prevScheduleInfo => {
                    const newScheduleInfo = data
                    setStartingPoint(prevStartingPoint => {
                        setScheduleAtSelectedStop(
                            transformScheduleByStartingPoint(newScheduleInfo, newScheduleInfo.startsFrom))
                        return newScheduleInfo.startsFrom
                    })
                    return newScheduleInfo
                })
                // @ts-ignore
                window.history.replaceState(null, null, `/lines/${lineId}/${isReverse ? 'reverse' : 'normal'}`)
            })
    }, [isReverse, lineId])

    const handleStartingPointSelect = (event: any) => {
        const stop = scheduleInfo.stops.filter(item => item.timeFromStart === event.target.value)[0]
        setStartingPoint(stop)
        setScheduleAtSelectedStop(transformScheduleByStartingPoint(scheduleInfo, stop))
    }

    return (
        <>
            <div className="w-full flex justify-center font-bold">
                {lineId} -&nbsp;<span className="uppercase">{scheduleInfo.startsFrom.name} - {scheduleInfo.stops.slice(-1)[0].name}</span>
            </div>
            <StartingPointSelector lineId={params['lineId'] as string}
                                   stops={scheduleInfo.stops}
                                   startsFrom={scheduleInfo.startsFrom}
                                   selectedStop={startingPoint}
                                   setReverse={setReverse}
                                   handleStartingPointSelect={handleStartingPointSelect}/>
            <div className="card w-full mt-2 p-3 rounded-md">
                {scheduleAtSelectedStop.startTimes.map(startTime =>
                    <div key={startTime.hour.toString()} className="w-full border-b-[1px] border-gray-300 mt-2 flex gap-1">
                        <div className="pr-1 border-gray-300 border-r-2">{startTime.hour.toString()}</div>
                        <div className="pl-1 flex justify-start gap-1.5">
                            {startTime.minutes.map(minute =>
                                <span key={minute}>{minute}</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

function transformScheduleByStartingPoint(schedule: Schedule, startingPoint: Stop): Schedule {
    let startTimes: Array<StartTimes> = schedule.startTimes.map(startTime =>
        new StartTimes(startTime.hour, startTime.minutes.map(minute => minute + startingPoint.timeFromStart)))
    for (let hour = 0; hour < startTimes.length; hour++) {
        const minutesOver59 = startTimes[hour].minutes
            .filter(minute => minute > 59)
        for (let minute of minutesOver59) {
            const hourRolloverCount = Math.floor(minute / 60)
            const realMinute = minute % 60
            startTimes[hour + hourRolloverCount].minutes.push(realMinute)
        }
        startTimes[hour] = new StartTimes(startTimes[hour].hour, startTimes[hour].minutes
            .filter(minute => minute < 60).sort((a, b) =>
                a === b
                    ? 0
                    : a < b
                        ? -1
                        : 1
            ))
    }
    return new Schedule(schedule.line, schedule.stops, startTimes, schedule.startsFrom)
}