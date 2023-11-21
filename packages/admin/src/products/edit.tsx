import { useLoaderData } from "react-router-dom";
import { ProductForm } from "./form"
export function EditProduct() {
    const data = useLoaderData();
    return (
        <ProductForm data={data.product} />
    )
} 