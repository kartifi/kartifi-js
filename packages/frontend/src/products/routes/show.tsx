import config from "../../config";
import { ShowProduct } from "../show";

export const ShowProductRoute = {
    path: "/products/:id",
    element: <ShowProduct />,
    loader: async ({ params }) => {
        let productResponse = await fetch(`${config.BASE_URL}/products/${params.id}`);
        let productData = await productResponse.json();
        // let cartResponse = await fetch(`${config.BASE_URL}/cart`, {
        //     credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }

        // });


        // let cartData = await cartResponse.json();
        return { product: productData, }
    }
}