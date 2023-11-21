import { Product } from "../../api/v1/models/product";
import { productOptionFactory } from "./product-option.factory";
import { faker } from '@faker-js/faker';
import { productVariantFactory } from "./product-variant.factory";

export const ProductFactory = async (count: number = 1) => {
    const products: Product[] = [];
    for (let i = 0; i < count; i++) {
        const product = new Product();
        product.title = faker.commerce.productName();
        product.description = faker.commerce.productDescription();
        product.variants = await productVariantFactory(2);
        product.options = await productOptionFactory();
        products.push(product);
    }
    return products;
}

