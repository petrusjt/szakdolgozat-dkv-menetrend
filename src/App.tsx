import React from 'react';
import './App.css';
import {getScheduleForLine} from "./data-services/schedule-information";
import {Stop} from "./model/schedule/stop";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
        {["15", "15Y"].map(lineName =>
            <>
                <h1 className="font-bold">{lineName} megállók</h1>
                {getScheduleForLine(lineName).stops.map((item: Stop) =>
                    <div key={item.name} className="flex w-48 justify-between">
                        <div>{item.name}</div>
                        <div>{item.timeFromStart}</div>
                    </div>
                )}
            </>
        )}
    </div>
  );
}

export default App;
