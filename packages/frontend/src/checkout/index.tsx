import { useLoaderData } from "react-router-dom";
import { CheckoutAddress } from "./address";
import { mainStore } from "../store";

export function Checkout() {
    let data = useLoaderData();
    let cart = mainStore((state) => state.cart);
    data.cart = cart;
    return (
        <>
            {cart && <CheckoutAddress key={data.cart.id} data={data} />}
        </>
    )
}