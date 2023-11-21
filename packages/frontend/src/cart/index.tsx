import { Button } from "flowbite-react";
import { Link, useLoaderData } from "react-router-dom";
import { mainStore } from "../store";
export function Cart() {
    // let data = useLoaderData();
    const cart = mainStore((state) => state.cart);


    return (
        <div>
            <h1>Cart</h1>
            {cart && cart.lineItems.map((lineItem: any) => (
                <div key={lineItem.id}>
                    <h2>{lineItem.variant.title}</h2>
                    <p>Quantity: {lineItem.quantity}</p>
                </div>
            ))}
            <Link to="/checkout">Checkoout</Link>
        </div>
    )
}