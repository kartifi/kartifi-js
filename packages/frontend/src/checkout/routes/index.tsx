import { redirect } from "react-router-dom";
import { Checkout } from "..";
import config from "../../config";


export const IndexCheckoutRoute = {
    path: "/checkout",
    element: <Checkout />,
    loader: async () => {
        // let cartResponse = await fetch(config.BASE_URL + "/cart", {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     credentials: 'include'

        // });
        // let cart = await cartResponse.json();
        let addressesResponse = await fetch(config.BASE_URL + "/address", {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'

        });
        if (addressesResponse.ok) {
            let addresses = await addressesResponse.json();
            return { addresses }
        } else {
            return redirect("/login");
        }
        // let addressResponse = await fetch(config.BASE_URL + "/address", {

    }
}