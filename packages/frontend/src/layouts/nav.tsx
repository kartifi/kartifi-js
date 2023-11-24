import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { mainStore } from "../store";
import { useEffect } from "react";
import config from "../config";
import { useLocation } from "react-router-dom";

export function Nav() {
    let cart = mainStore((state: any) => state.cart);
    let setCart = mainStore((state: any) => state.setCart);
    const location = useLocation();
    useEffect(() => {

        fetch(`${config.BASE_URL}/cart`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setCart(data);
            });

    }, [location])


    return (
        <Navbar fluid rounded>
            <Navbar.Brand href={`http://localhost:5173`}>

                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Kartify</span>
            </Navbar.Brand>
            {/* <div className="ml-4">
                Ship to: United States
            </div> */}
            <div className="flex md:order-2">
                <Link to="/cart" >Cart:{cart ? cart.lineItems.length : 0}</Link>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <input type="text" placeholder="Search" />
            </Navbar.Collapse>
        </Navbar>
    )
}