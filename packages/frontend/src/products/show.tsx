
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { mainStore } from "../store";

export function ShowProduct() {
    const navigate = useNavigate();
    var selectedOptions: any = [];

    const allData: any = useLoaderData();
    const data = allData.product;
    // const cart = allData.cart;
    const cart = mainStore((state: any) => state.cart);
    const [oldLineItem, setOldLineItem] = useState({
        id: 0
    });

    const [selectedVariant, setSelectedVariant] = useState({
        id: 0
    });
    const lineItemFetcher = useFetcher();
    // const cartSubmit = useSubmit();
    const cartFetcher = useFetcher();



    const handleVariantChange = useCallback((e) => {
        //TODO: find the variant that matches the selected options
        selectedOptions.push(e.target.value);
        if (selectedOptions.length === data.options.length) {
            const variant = data.variants.find((variant) => {
                return variant.options.every((option) => {
                    return selectedOptions.includes(option.value);
                })
            })

            if (variant) {
                console.log(variant);
                setSelectedVariant(variant);

                setOldLineItem(cart.lineItems.find((lineItem) => lineItem.variant.id === variant.id));
                setImage(variant.image.src);
            }
            selectedOptions = [];
        }


        // setImage(variant.image.src);
    }, [data.variants, cart])

    useEffect(() => {
        if (lineItemFetcher.data) {


            cartFetcher.submit(JSON.stringify(lineItemFetcher.data), {
                method: cart.lineItems.length > 0 ? 'PUT' : 'POST',
                action: cart.lineItems.length > 0 ? `/cart/${cart.id}/edit` : '/cart/new',
                encType: "application/json"
            });
        }
        else if (lineItemFetcher.data === null) {
            console.log('Select a variant');
        }
    }, [lineItemFetcher.data])

    useEffect(() => {
        if (cartFetcher.data) {


            // setCart(cartFetcher.data);
            navigate('/cart');
        }
    }, [cartFetcher, navigate])

    const [image, setImage] = useState(data.variants[0].image.src);
    return (
        <>
            <div className="w-1/4">

                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src={image} alt="" />
                        {/* <img className="h-auto max-w-full rounded-lg" src={`${config.BASE_URL}/${config.IMAGE_DIR}/${image}`} alt="" /> */}
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                        </div>

                    </div>
                </div>

            </div>
            <div className="w-2/4 pl-4">
                <h2 className="text-4xl">
                    {data.title}
                </h2>
                <div className="block">{data.description}</div>
                <div className="w-2/4">
                    {data.options.map((option) => (
                        <Select id={`select-${option.key}`} onChange={handleVariantChange} key={`${option.key}`}>
                            <option value="">{`Select ${option.key}`}</option>
                            {option.value.split(',').map((value) => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </Select>
                    ))}

                </div>
            </div>
            <div className="w-1/4 pl-4">
                <lineItemFetcher.Form action={oldLineItem.id > 0 ? `/line-items/${oldLineItem.id}/edit` : '/line-items'} method="POST">
                    <div className="w-2/4" >
                        <div className="mb-2 block">
                            <Label htmlFor="quantity" value="Quantity" />
                        </div>
                        <TextInput id="quantity" name="quantity" type="number" min={1} defaultValue={1} />
                        <input type="hidden" name="variantId" defaultValue={selectedVariant?.id} />
                        {/* <input type="hidden" name="productId" value={data.id} /> */}
                    </div>
                    <div className="block mt-4">
                        <Button type="submit" pill color="yellow">Add to cart</Button>
                    </div>
                </lineItemFetcher.Form>
            </div>


        </>
    )
}