'use client';
import { Outlet, Link } from "react-router-dom";
import { Sidebar } from "flowbite-react";

export function Layout() {
    return (
        <>
            <div className="flex">
                <Sidebar>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item>
                            <Link to="/">Products</Link>
                        </Sidebar.Item>

                    </Sidebar.ItemGroup>
                </Sidebar>
                <div className="flex-1 ml-4">
                    <Outlet />
                </div>
            </div>



        </>
    )
}