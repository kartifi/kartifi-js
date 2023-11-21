import config from "../../config";
import { EditProduct } from "../edit";
export let EditProductRoute = {
  path: "/products/:id/edit",
  element: <EditProduct />,
  loader: async ({ params }) => {
    let productData = await fetch(`${config.BASE_URL}/products/${params.id}`);
    let product = await productData.json();
    return { product };
  }

}