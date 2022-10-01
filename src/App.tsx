import React from 'react';
import './App.css';
import {getScheduleForLine} from "./data-services/schedule-information";
import {Stop} from "./model/schedule/stop";

function App() {
  return (
    <div className="w-screen h-screen bg-gray-200 dark:bg-slate-800 dark:text-white flex flex-col justify-center items-center">
        {["15", "15Y"].map(lineName =>
            <div className="bg-white dark:bg-slate-600 mt-2 p-3 rounded-md">
                <h1 className="font-bold">{lineName} megállók</h1>
                {getScheduleForLine(lineName).stops.map((item: Stop) =>
                    <div key={item.name} className="flex w-48 justify-between">
                        <div>{item.name}</div>
                        <div>{item.timeFromStart}</div>
                    </div>
                )}
            </div>
        )}
    </div>
  );
}

export default App;
