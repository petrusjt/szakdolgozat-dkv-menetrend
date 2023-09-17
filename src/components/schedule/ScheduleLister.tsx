import {Stop} from "src/model/schedule/stop";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Schedule} from "src/model/schedule/schedule";
import {StartTimes} from "src/model/schedule/start-times";
import {Route} from "src/model/schedule/route";
import {StartingPointSelector} from "src/components/schedule/subcomponents/StartingPointSelector";
import hasReverseDirection from "src/model/line-info/line-direction-info";
import {useTranslation} from "react-i18next";
import {getScheduleClassifierFromDate} from "src/util/date-helper";

export type Props = {
    baseRestPath: string
}
export function ScheduleLister({baseRestPath}: Props) {
    const {t,} = useTranslation()

    const params = useParams()
    const [isReverse, setReverse] = useState(params["reverse"] === "reverse")
    const lineId = params["lineId"] as string
    const defaultScheduleInfo = new Schedule(new Route("Error"), [new Stop("Error", 0)], [], new Stop("Error", 0))
    const [scheduleInfo, setScheduleInfo] = useState(defaultScheduleInfo)
    const [scheduleAtSelectedStop, setScheduleAtSelectedStop] = useState(scheduleInfo)
    const [startingPoint, setStartingPoint] = useState(scheduleInfo.startsFrom)

    const [hasReverseDirectionState,] = useState(hasReverseDirection(lineId))
    const [runsToday, setRunsToday] = useState(false)

    const [isErrorState, setErrorState] = useState(false)

    const scheduleClassifier = getScheduleClassifierFromDate(new Date())

    useEffect(() => {
        const cachedData = localStorage.getItem(`${lineId}_${isReverse ? 'REVERSE' : 'NORMAL'}_${scheduleClassifier}`)
        if (cachedData) {
            handleFromCacheLoad(JSON.parse(cachedData), lineId, isReverse, setScheduleInfo, setStartingPoint,
                setScheduleAtSelectedStop, setRunsToday)
        } else {
            fetch(`${baseRestPath}/${lineId}/${isReverse ? 'REVERSE' : 'NORMAL'}`)
                .then(res => res.json())
                .then(data => {
                    handleFromCacheLoad(data, lineId, isReverse, setScheduleInfo, setStartingPoint,
                        setScheduleAtSelectedStop, setRunsToday)

                    localStorage.setItem(`${lineId}_${isReverse ? 'REVERSE' : 'NORMAL'}_${scheduleClassifier}`,
                        JSON.stringify(data))
                    setErrorState(false)
                })
                .catch(() => {
                    setErrorState(true)
                })
        }
    }, [isReverse, lineId, baseRestPath, scheduleClassifier])

    const handleStartingPointSelect = (event: any) => {
        const stop = scheduleInfo.stops.filter(item => item.timeFromStart === event.target.value)[0]
        setStartingPoint(stop)
        setScheduleAtSelectedStop(transformScheduleByStartingPoint(scheduleInfo, stop))
    }

    return (
        <>
            {isErrorState
                ? <div className="w-full card font-bold">{t('schedule.dataNotAvailable').toString()}</div>
                : <div className="w-full">
                    <div className="w-full flex justify-center font-bold">
                        {lineId} -&nbsp;<span className="uppercase">{scheduleInfo.startsFrom.name} - {scheduleInfo.stops.slice(-1)[0].name}</span>
                    </div>
                    <div className="md:flex md:flex-row md:gap-2">
                        <div className="w-full">
                            <StartingPointSelector lineId={params['lineId'] as string}
                                                   stops={scheduleInfo.stops}
                                                   startsFrom={scheduleInfo.startsFrom}
                                                   selectedStop={startingPoint}
                                                   setReverse={setReverse}
                                                   handleStartingPointSelect={handleStartingPointSelect}
                                                   hasReverseDirection={hasReverseDirectionState}
                                                   runsToday={runsToday}/>
                        </div>
                        <div className="card w-full mt-2 p-3 rounded-md md:pt-1">
                            {runsToday
                                ? scheduleAtSelectedStop.startTimes.map(startTime =>
                                    <div key={startTime.hour.toString()} className="w-full border-b-[1px] border-gray-300 mt-2 flex gap-1">
                                        <div className="pr-1 border-gray-300 border-r-2 w-[2em] text-right">{startTime.hour.toString()}</div>
                                        <div className="pl-1 flex justify-start gap-1.5">
                                            {startTime.minutes.map(minute =>
                                                <span key={minute}>{minute}</span>
                                            )}
                                        </div>
                                    </div>)
                                : <div className="w-full h-full flex justify-center items-center font-bold">
                                    <span className="w-fit">{t('line.notRunningToday').toString()}</span>
                                </div>}
                        </div>
                    </div>
                </div>}
        </>
    )
}

function handleFromCacheLoad(data: any, lineId: string, isReverse: boolean, setScheduleInfo: any,
                             setStartingPoint: any, setScheduleAtSelectedStop: any, setRunsToday: any) {
    setScheduleInfo(() => {
        const newScheduleInfo = data
        if (newScheduleInfo.startTimes.length > 0) {
            setStartingPoint(() => {
                setScheduleAtSelectedStop(
                    transformScheduleByStartingPoint(newScheduleInfo, newScheduleInfo.startsFrom))
                return newScheduleInfo.startsFrom
            })
            setRunsToday(true)
        } else {
            setRunsToday(false)
        }
        return newScheduleInfo
    })
    // @ts-ignore
    window.history.replaceState(null, null, `/lines/${lineId}/${isReverse ? 'reverse' : 'normal'}`)
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