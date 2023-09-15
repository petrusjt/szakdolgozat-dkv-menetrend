import {Outlet} from "react-router-dom";
import {Header} from "src/components/main/Header";
import {updateTheme} from "src/util/theme-helper";


export function Root() {
    updateTheme()
    return (
        <div className="w-screen h-screen bg-gray-200 dark:bg-slate-800 dark:text-white overflow-x-hidden">
            <div className="w-full h-full flex flex-col">
                <div className="w-full lg:flex lg:justify-center">
                    <div className="lg:w-2/3 lg:px-2.5 lg:min-w-[400px] lg:max-w-[1000px]">
                        <Header />
                    </div>
                </div>
                <div className="w-full lg:flex lg:justify-center">
                    <div className="p-3 lg:w-2/3 lg:min-w-[400px] lg:max-w-[1000px]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}