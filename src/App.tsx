import React from 'react';
import './App.css';
import {getScheduleForLine} from "./data-services/schedule-information";
import {Stop} from "./model/stop";

function App() {
  return (
    <div className="w-screen h-screen bg-green-600 flex flex-col justify-center items-center">
        <h1 className="font-bold">15 megállók</h1>
        {getScheduleForLine("15").stops.map((item: Stop) => <div>{item.name}</div>)}
        <h1 className="font-bold">15Y megállók</h1>
        {getScheduleForLine("15Y").stops.map((item: Stop) => <div>{item.name}</div>)}
    </div>
  );
}

export default App;
