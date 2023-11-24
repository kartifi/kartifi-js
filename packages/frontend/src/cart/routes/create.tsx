
import config from "../../config";





export const CartCreateRoute = {
    path: "/cart/new",
    action: async ({ request }) => {
        // let formData = await request.formData();


        let data = await request.json();


        let res = await fetch(`${config.BASE_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        let cart = await res.json();


        return cart;


    }
}