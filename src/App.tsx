import React, {useState} from 'react';
import './App.css';
import { ScheduleLister } from './components/schedule/ScheduleLister';
import {ScheduleSelector} from "./components/schedule/ScheduleSelector";
import {baseChangeListener} from "src/util/ListenerUtils";

function App() {
    const [selectedLine, setSelectedLine] = useState(0)
    const [startingPoint, setStartingPoint] = useState("")

    const handleLineSelect = baseChangeListener(setSelectedLine)
    const handleStartingPointSelect = baseChangeListener(setStartingPoint)

    return (
        <div className="w-screen h-screen bg-gray-200 dark:bg-slate-800 p-2
                    dark:text-white flex flex-col justify-center items-center">

            <ScheduleSelector selectedLine={selectedLine}
                              handleLineSelect={handleLineSelect}
                              handleStartingPointSelect={handleStartingPointSelect} />
            {selectedLine
                ? <ScheduleLister selectedLine={selectedLine} startingPoint={startingPoint}/>
                : ""}
        </div>
    );
}

export default App;
