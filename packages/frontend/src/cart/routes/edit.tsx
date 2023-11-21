import config from "../../config";

export const CartEditRoute = {
    path: "/cart/:id/edit",
    action: async ({ params, request }) => {
        // let formData = await request.formData();


        let data = await request.json();


        let res = await fetch(`${config.BASE_URL}/cart/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        let cart = await res.json();

        if (res.status === 200) {
            return cart;
        }
        else {
            return null;
        }


    }
}