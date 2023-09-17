import React from 'react';
import './App.css';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {DirectionsBusFilled, Tram} from "@mui/icons-material";
import {LineSelectHelper} from "src/util/line-select-helper";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function App() {
    const [t, ] = useTranslation()
    const selectLineList = LineSelectHelper.getLineSelectList()
    return (
        <div className="w-full bg-gray-200 dark:bg-slate-800 p-2
                    dark:text-white flex flex-col justify-center items-center">
            <List className="card w-full max-w-full max-h-full">
                {selectLineList.map(lineSelectHelper =>
                    <ListItem className="!p-0" key={lineSelectHelper.value}>
                        <Link className="w-full" to={`/lines/${lineSelectHelper.value}/normal`}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {lineSelectHelper.category === 'tram'
                                        ? <Tram className="mui-color-override" />
                                        : <DirectionsBusFilled className="mui-color-override" />}
                                </ListItemIcon>
                                <ListItemText primary={lineSelectHelper.label + (lineSelectHelper.category === 'trolley' ? ` - ${t('trolley').toString()}` : '')} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                )}
            </List>
        </div>
    );
}

export default App;
