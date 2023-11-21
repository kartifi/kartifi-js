import { Outlet } from "react-router-dom";
import { Nav } from "./nav";
export function Layout() {

    return (
        <>
            <Nav />
            <div className="flex flex-wrap ml-3 mr-3">
                <Outlet />
            </div>
        </>
    )
}