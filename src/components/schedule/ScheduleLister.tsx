import {getScheduleForLine} from "src/data-services/schedule-information";
import {Stop} from "src/model/schedule/stop";
import {useParams} from "react-router-dom";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {baseChangeListener} from "src/util/listener-utils";

/*
type Props = {
    selectedLine: number,
    startingPoint: string
}

export function ScheduleLister(props: Props) {
    const schedule = getScheduleForLine("" + props.selectedLine)
    const startingPoint = schedule.stops.filter(stop => stop.name === props.startingPoint)[0] || schedule.stops[0]

    return (
        <div className="w-full mt-2 p-3 rounded-md">
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
}*/

export function ScheduleLister() {
    const [t, i18n] = useTranslation()
    const params = useParams()
    const scheduleInfo = getScheduleForLine(params["lineId"] as string)
    const [startingPointName, setStartingPointName] = useState(params["startFrom"])
    const [startingPoint, setStartingPoint] = useState(params["startFrom"]
        ? scheduleInfo.stops.filter(item => item.name === params["startFrom"])[0]
        : scheduleInfo.startsFrom)

    const handleStartingPointSelect = (event: any) => {
        const stop = scheduleInfo.stops.filter(item => item.name === event.target.value)[0]
        console.log(stop)
        setStartingPoint(stop)
        setStartingPointName(event.target.value)
    }

    return (
        <>
            <FormControl className="card w-full" size="small">
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
                        className="dark:!text-white"
                        onChange={handleStartingPointSelect}>
                    {
                        // TODO villamosoknál ez problémás lesz
                        scheduleInfo.stops.map((stop: Stop) =>
                            <MenuItem value={stop.name}>{stop.name}</MenuItem>)
                    }
                </Select>
            </FormControl>
            <div className="card w-full mt-2 p-3 rounded-md">
                <h1 className="font-bold">{t("line.stops").replace("%s", params["lineId"] as string)}</h1>
                {scheduleInfo.stops.map((item: Stop) =>
                    <div key={item.name} className="flex w-full justify-between">
                        <div className={`${item.name === scheduleInfo.startsFrom.name ? 'underline' : ''}
                                     ${item.name === startingPoint.name ? 'font-bold' : ''}`}>
                            {item.name}
                        </div>
                        <div>{item.timeFromStart - startingPoint.timeFromStart}</div>
                    </div>
                )}
            </div>
        </>
    )
}