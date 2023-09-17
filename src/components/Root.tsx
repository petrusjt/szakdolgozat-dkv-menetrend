import {Outlet} from "react-router-dom";
import {Header} from "src/components/main/Header";
import {updateTheme} from "src/util/theme-helper";


export function Root() {
    updateTheme()
    return (
        <div className="w-screen h-screen bg-gray-200 dark:bg-slate-800 dark:text-white overflow-x-hidden">
            <div className="w-full h-full flex flex-col">
                <div className="w-full md:flex md:justify-center">
                    <div className="w-full lg:w-2/3 md:px-2.5 md:min-w-[400px] md:max-w-[1000px]">
                        <Header />
                    </div>
                </div>
                <div className="w-full md:flex md:justify-center">
                    <div className="p-3 w-full lg:w-2/3 md:min-w-[400px] md:max-w-[1000px]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}