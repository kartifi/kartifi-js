import { ListProducts } from "..";
import config from "../../config";

export const IndexProductsRoute = {
    path: "/products",
    element: <ListProducts />,
    loader: async () => {
        let res = await fetch(`${config.BASE_URL}/products`);
        let data = await res.json();
        return data;
    }
}