'use client';
import { Outlet, Link } from "react-router-dom";
import { Sidebar } from "flowbite-react";

export function Layout() {
    return (
        <>
            <div className="flex">
                <Sidebar>
                    <Sidebar.ItemGroup>

                        <Link to="/products">Products</Link>
                        <br />
                        <Link to="/orders">Orders</Link>

                    </Sidebar.ItemGroup>
                </Sidebar>
                <div className="flex-1 ml-4">
                    <Outlet />
                </div>
            </div>



        </>
    )
}