import { ProductOption } from "../../api/v1/models/product-option";

export const productOptionFactory = async () => {
    const productOptions: ProductOption[] = [];

    const productOption1 = new ProductOption();
    productOption1.key = 'Color';
    productOption1.value = 'Red, Green, Blue';
    productOptions.push(productOption1);

    const productOption2 = new ProductOption();
    productOption2.key = 'Size';
    productOption2.value = 'Small, Medium, Large';
    productOptions.push(productOption2);

    return productOptions;
}