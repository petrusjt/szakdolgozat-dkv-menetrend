import {Stop} from "src/model/schedule/stop";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {FormControl, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import {Schedule} from "src/model/schedule/schedule";
import {StartTimes} from "src/model/schedule/start-times";
// TODO ezt teljesen újra kell írni
const BASE_REST_PATH = 'http://localhost:8080/thesis-dkv-schedule/api/schedule-input/'

export function ScheduleLister() {
    const [t,] = useTranslation()
    const params = useParams()
    const [isReverse, setReverse] = useState(params["reverse"] === "reverse")
    const lineId = params["lineId"] as string
    const [scheduleInfo, setScheduleInfo] = useState()
    const [scheduleAtSelectedStop, setScheduleAtSelectedStop] = useState(scheduleInfo)
    const [startingPointName, setStartingPointName] = useState(scheduleInfo ? scheduleInfo['startsFrom']['name'] : '')
    const [startingPoint, setStartingPoint] = useState(scheduleInfo ? scheduleInfo['startsFrom'] : '')

    useEffect(() => {
        fetch(`${BASE_REST_PATH}${lineId}/${isReverse ? 'REVERSE' : 'NORMAL'}`)
            .then(res => res.json())
            .then(data => {
                setScheduleInfo(prevScheduleInfo => {
                    const newScheduleInfo = data
                    setStartingPoint(prevStartingPoint => {
                        setScheduleAtSelectedStop(
                            // @ts-ignore
                            transformScheduleByStartingPoint(newScheduleInfo, newScheduleInfo.startsFrom))
                        setStartingPointName(newScheduleInfo.startsFrom.name)
                        return newScheduleInfo.startsFrom
                    })
                    return newScheduleInfo
                })
            })
    }, [isReverse, lineId])

    const handleStartingPointSelect = (event: any) => {
        if (!scheduleInfo) {
            return
        }
        // @ts-ignore
        const stop = scheduleInfo.stops.filter(item => item.name === event.target.value)[0]
        setStartingPoint(stop)
        setStartingPointName(event.target.value)
        // @ts-ignore
        setScheduleAtSelectedStop(transformScheduleByStartingPoint(scheduleInfo, stop))
    }

    const onReverseClick = (event: any) => {
        setReverse(prevReverse => {

            // @ts-ignore
            window.history.replaceState(null, null, `/lines/${lineId}/${!prevReverse ? 'reverse' : 'normal'}`)
            return !prevReverse
        })
    }

    return (
        <>
            {/*@ts-ignore*/}
            <div className="w-full flex justify-center font-bold">{lineId} -&nbsp;<span className="uppercase">{scheduleInfo.startsFrom.name} - {scheduleInfo.stops.slice(-1)[0].name}</span></div>
            <FormControl className="card w-full !mt-3" size="small">
                <div className="flex w-full gap-1">
                    <div className="w-11/12">
                        <InputLabel id="startingPointSelectLabel" className="mui-color-override">
                            {t("schedule.selector.startingPoint").toString()}
                        </InputLabel>
                        <Select labelId="startingPointSelectLabel"
                                label={t("schedule.selector.startingPoint").toString()}
                                value={startingPointName}
                                sx={{
                                    color: 'black',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#999'
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: '#999'
                                    }
                                }}
                                className="dark:!text-white w-full"
                                onChange={handleStartingPointSelect}>
                            {
                                // TODO villamosoknál ez problémás lesz
                                // @ts-ignore
                                scheduleInfo.stops.map((stop: Stop) =>
                                    <MenuItem value={stop.name} key={stop.name}>{stop.name}</MenuItem>)
                            }
                        </Select>
                    </div>
                    <Tooltip title={t('line.changeDirection').toString()}>
                        <div className="w-1/12 flex justify-center items-center dark:bg-slate-700 cursor-pointer rounded-md
                                    dark:border-gray-300 border-gray-400 border-[1px]" onClick={onReverseClick}>
                            <SwapHorizOutlinedIcon className="mui-color-override" />
                        </div>
                    </Tooltip>
                </div>
            </FormControl>
            <div className="card w-full mt-2 p-3 rounded-md">
                <h1 className="font-bold">{t("line.stops").replace("%s", params["lineId"] as string)}</h1>
                {/*@ts-ignore*/}
                {scheduleInfo.stops.map((item: Stop) =>
                    <div key={item.name} className="flex w-full justify-between">
                        {/*@ts-ignore*/}
                        <div className={`${item.name === scheduleInfo.startsFrom.name ? 'underline' : ''} ${item.name === startingPoint.name ? 'font-bold' : ''}`}>
                            {item.name}
                        </div>
                        {/*@ts-ignore*/}
                        <div>{item.timeFromStart - startingPoint.timeFromStart}</div>
                    </div>
                )}
            </div>
            <div className="card w-full mt-2 p-3 rounded-md">
                {/*@ts-ignore*/}
                {scheduleAtSelectedStop.startTimes.map(startTime =>
                    <div key={startTime.hour.toString()} className="w-full border-b-[1px] border-gray-300 mt-2 flex gap-1">
                        <div className="pr-1 border-gray-300 border-r-2">{startTime.hour.toString()}</div>
                        <div className="pl-1 flex justify-start gap-1.5">
                            {/*@ts-ignore*/}
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
            .filter(minute => minute < 60).sort())
    }
    return new Schedule(schedule.line, schedule.stops, startTimes, schedule.startsFrom)
}