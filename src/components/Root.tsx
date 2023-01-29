import {Outlet} from "react-router-dom";
import {Header} from "src/components/main/Header";
import {updateTheme} from "src/util/theme-helper";


export function Root() {
    updateTheme()
    return (
        <div className="w-screen h-screen bg-gray-200 dark:bg-slate-800 dark:text-white overflow-x-hidden">
            <Header />
            <div className="p-3">
                <Outlet />
            </div>
        </div>
    )
}