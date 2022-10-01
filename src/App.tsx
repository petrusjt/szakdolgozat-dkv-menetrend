import React, {useState} from 'react';
import './App.css';
import {FormControl, InputLabel, ListSubheader, Menu, MenuItem, Select} from "@mui/material";
import { ScheduleLister } from './ScheduleLister';
import {LineSelectHelper} from "./util/line-select-helper";

function App() {
    const [selectedLine, setSelectedLine] = useState()

    const handleLineSelect = (event: any) => {
        setSelectedLine(event.target.value)
    }

    const selectLineList = LineSelectHelper.getLineSelectList()

    return (
        <div className="w-screen h-screen bg-gray-200 dark:bg-slate-800 p-2
                    dark:text-white flex flex-col justify-center items-center">
            <div className="card w-full">
                <FormControl className="w-full">
                    <InputLabel id="lineLabel" className="dark:!text-white">Járat</InputLabel>
                    <Select labelId="lineLabel"
                            label="Járat"
                            className="dark:!text-white"
                            onChange={handleLineSelect}>
                        {
                            selectLineList.map(item =>
                                item.isCategory
                                    ? <ListSubheader>{item.value}</ListSubheader>
                                    : <MenuItem value={item.value}>{item.label}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                {selectedLine
                    ? <ScheduleLister selectedLine={selectedLine} />
                    : ""}
            </div>
        </div>
    );
}

/*
{["15", "15Y"].map(lineName =>

)}
*/

export default App;
