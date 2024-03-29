import { Link } from "react-router-dom";
import { mainStore } from "../store";
import { Button } from "flowbite-react";
export function Cart() {
    // let data = useLoaderData();
    const cart = mainStore((state: any) => state.cart);


    return (
        <div>
            <h1>Cart</h1>
            {cart && cart.lineItems.map((lineItem: any) => (
                <div key={lineItem.id}>
                    <h2>{lineItem.variant.title}</h2>
                    <p>Quantity: {lineItem.quantity}</p>
                </div>
            ))}
            <Button><Link to="/checkout">Checkout</Link></Button>
        </div>
    )
}