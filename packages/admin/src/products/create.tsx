import { ProductForm } from "./form"
export function NewProduct() {
    return (
        <ProductForm data={{ description: '', options: [], variants: [] }} />
    )
} 