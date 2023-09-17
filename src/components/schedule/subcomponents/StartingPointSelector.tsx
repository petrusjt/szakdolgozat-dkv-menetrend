import {FormControl, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import {Stop} from "src/model/schedule/stop";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import React from "react";
import {useTranslation} from "react-i18next";

interface Props {
    lineId: string,
    stops: Array<Stop>,
    startsFrom: Stop,
    selectedStop: Stop
    setReverse: Function,
    handleStartingPointSelect: Function,
    hasReverseDirection: boolean
}

export function StartingPointSelector({lineId, stops, startsFrom, selectedStop, setReverse,
                                          handleStartingPointSelect, hasReverseDirection}: Props) {

    const [t, ] = useTranslation()

    return (
        <>
            <FormControl className="card w-full !mt-3" size="small">
                <div className="flex w-full gap-1">
                    <div className={hasReverseDirection ? "w-11/12" : 'w-full'}>
                        <InputLabel id="startingPointSelectLabel" className="mui-color-override">
                            {t("schedule.selector.startingPoint").toString()}
                        </InputLabel>
                        <Select labelId="startingPointSelectLabel"
                                label={t("schedule.selector.startingPoint").toString()}
                                value={selectedStop.timeFromStart}
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
                                onChange={(event) => handleStartingPointSelect(event)}>
                            {
                                stops.map((stop: Stop) =>
                                    <MenuItem value={stop.timeFromStart} key={stop.timeFromStart}>{stop.name}</MenuItem>)
                            }
                        </Select>
                    </div>
                    {hasReverseDirection &&
                        <Tooltip title={t('line.changeDirection').toString()}>
                            <div className="w-1/12 flex justify-center items-center dark:bg-slate-700 cursor-pointer rounded-md
                                        dark:border-gray-300 border-gray-400 border-[1px]"
                                 onClick={(event) => setReverse((prev: boolean) => !prev)}>
                                <SwapHorizOutlinedIcon className="mui-color-override"/>
                            </div>
                        </Tooltip>}
                </div>
            </FormControl>
            <div className="card w-full mt-2 p-3 rounded-md">
                <h1 className="font-bold">{t("line.stops").replace("%s", lineId)}</h1>
                {stops.map((item: Stop) =>
                    <div key={item.timeFromStart} className="flex w-full justify-between">
                        <div className={`${item.timeFromStart === startsFrom.timeFromStart ? 'underline' : ''} ${item.timeFromStart === selectedStop.timeFromStart ? 'font-bold' : ''}`}>
                            {item.name}
                        </div>
                        <div>{item.timeFromStart - startsFrom.timeFromStart}</div>
                    </div>
                )}
            </div>
        </>
    )
}