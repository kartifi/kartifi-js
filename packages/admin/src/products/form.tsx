import { useCallback, useEffect, useState } from "react";
import config from "../config";
import { OptionForm } from "../options/form";
import { VariantForm } from "../variants/form";
import { mainStore } from "../store";
import { TextInput, Label, Textarea, Button } from "flowbite-react";

export function ProductForm({ data }) {

    const productOptions = mainStore((state: any) => state.options);
    const variants = mainStore((state: any) => state.variants);
    const setOptions = mainStore((state: any) => state.setOptions);
    const setVariants = mainStore((state: any) => state.setVariants);
    const [message, setMessage] = useState('');

    useEffect(() => {

        if (data.options) {
            setOptions(data.options);
        }
        if (data.variants) {
            setVariants(data.variants);
        }
    }, [data])

    const productHandler = useCallback(async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        // (formData.get('title'));


        let dataToSubmit = {
            title: formData.get('title'),
            description: formData.get('description'),
            options: productOptions,
            variants: variants
        }

        let url = `${config.BASE_URL}/products`;
        let method = 'POST';
        if (data.id) {
            url = `${config.BASE_URL}/products/${data.id}`;
            method = 'PUT';
        }

        let res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(dataToSubmit)
        })

        if (res.status === 201) {
            setMessage('Saved');
        }
        if (res.status === 204) {
            setMessage('Updated');

        }



    }, [data, productOptions, variants])



    return (
        <>
            <form key="main" onSubmit={productHandler}>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="productTitle" value="Product title" />
                    </div>
                    <TextInput id="productTitle" name="title" required defaultValue={data.title} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="productDescription" value="Product description" />
                    </div>
                    <Textarea id="productDescription" name="description" defaultValue={data.description} />
                </div>


                <div className="mt-4">
                    <Button type="submit" >Save product</Button>
                </div>

            </form >
            <h4>{message}</h4>




            <OptionForm data={{ options: data.options, productId: data.id }} />

            <VariantForm data={{ variants: data.variants, productId: data.id }} />


        </>

    )
}

