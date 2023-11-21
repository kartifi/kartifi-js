import { ProductVariantOption } from "../../api/v1/models/product-variant-option";

export const productVariantOptionFactory = async () => {
    let productVariantsOptionsCollection: ProductVariantOption[];
    let colorOption = generateColorOptions();
    let sizeOption = generateSizeOptions();
    return productVariantsOptionsCollection = [colorOption, sizeOption];
}

function generateColorOptions() {
    const colorOptions = ["Red"];
    let productVariantsOptions = new ProductVariantOption();
    productVariantsOptions.title = 'Color';
    productVariantsOptions.value = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    return productVariantsOptions;
}

function generateSizeOptions() {
    const sizeOptions = ["Small"];
    let productVariantsOptions = new ProductVariantOption();
    productVariantsOptions.title = 'Size';
    productVariantsOptions.value = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
    return productVariantsOptions;
}