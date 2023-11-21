import config from "../../config";
import { Cart } from "..";

export const CartIndexRoute = {
    path: "/cart",
    element: <Cart />,
    // loader: async () => {
    //     let res = await fetch(`${config.BASE_URL}/cart`, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         credentials: 'include'
    //     });

    //     let data = await res.json();

    //     return data;

    // }
}