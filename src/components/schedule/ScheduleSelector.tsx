import {FormControl, InputLabel, ListSubheader, MenuItem, Select} from "@mui/material";
import React from "react";
import {LineSelectHelper} from "src/util/line-select-helper";
import {useTranslation} from "react-i18next";
import {getScheduleForLine} from "src/data-services/schedule-information";
import {Stop} from "src/model/schedule/stop";

type Props = {
    selectedLine: any,
    handleLineSelect: any,
    handleStartingPointSelect: any
}

export function ScheduleSelector(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    const selectLineList = LineSelectHelper.getLineSelectList()
    const schedule = getScheduleForLine("" + props.selectedLine)
    return (
        <div className="card w-full">
            <FormControl className="w-full" size="small">
                <InputLabel id="lineLabel"
                            className="dark:!text-white">
                    {t('schedule.selector.line').toString()}
                </InputLabel>
                <Select labelId="lineLabel"
                        className="dark:!text-white"
                        onChange={props.handleLineSelect}>
                    {
                        selectLineList.map(item =>
                            item.isCategory
                                ? <ListSubheader>{item.value}</ListSubheader>
                                : <MenuItem value={item.value}>{item.label}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            <FormControl className="w-full !mt-3" size="small">
                <InputLabel id="startingPointLabel"
                            className="dark:!text-white">
                    {t('schedule.selector.startingPoint').toString()}
                </InputLabel>
                <Select labelId="startingPointLabel"
                        className="dark:!text-white"
                        disabled={props.selectedLine === 0}
                        onChange={props.handleStartingPointSelect}>
                    {
                        // TODO villamosoknál ez problémás lesz
                        schedule.stops.map((stop: Stop) =>
                            <MenuItem value={stop.name}>{stop.name}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </div>
    )
}