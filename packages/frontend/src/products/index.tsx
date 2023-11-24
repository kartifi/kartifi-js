import { Card } from "flowbite-react";
import { Link, useLoaderData } from "react-router-dom";

export function ListProducts() {
    const data: any = useLoaderData();

    return (
        <>
            {data.map((product) => (

                <Link to={`/products/${product.id}`} key={product.id}>
                    <Card
                        key={`product-card-${product.id}`}
                        className="max-w-sm ml-3 mt-3"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc=""
                    >
                        <h5 key={`product-title-${product.id}`} className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {product.title}
                        </h5>
                        <p key={`product-description-${product.id}`} className="font-normal text-gray-700 dark:text-gray-400">
                            {product.description}
                        </p>
                    </Card>
                </Link>


            ))}
        </>
    )
}