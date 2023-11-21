import { ProductVariant } from "../../api/v1/models/product-variant";
import { faker } from '@faker-js/faker';
import { productVariantOptionFactory } from "./product-variant-option.factory";
import { imageFactory } from "./image.factory";
export const productVariantFactory = async (count: number = 1) => {
    const productVariants: ProductVariant[] = [];
    for (let i = 0; i < count; i++) {
        let productVariant = await generateVariant();
        productVariants.push(productVariant);
    }

    return productVariants;
}

async function generateVariant() {
    const productVariant = new ProductVariant();
    productVariant.title = faker.commerce.productName();
    productVariant.description = faker.commerce.productDescription();
    productVariant.price = faker.commerce.price();
    productVariant.salePrice = faker.commerce.price();
    productVariant.image = await imageFactory(1);
    productVariant.options = await productVariantOptionFactory();
    return productVariant;
}