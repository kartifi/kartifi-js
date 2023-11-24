import { useLoaderData } from "react-router-dom";
import { CheckoutAddress } from "./address";
import { mainStore } from "../store";

export function Checkout() {
    let data: any = useLoaderData();
    let cart = mainStore((state: any) => state.cart);
    data.cart = cart;
    return (
        <>
            {cart && <CheckoutAddress key={data.cart.id} data={data} />}
        </>
    )
}