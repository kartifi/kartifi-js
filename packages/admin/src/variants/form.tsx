import { useCallback, useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { mainStore } from "../store";
import { Modal, Button, TextInput, Label, Textarea, Select, FileInput } from "flowbite-react";

export function VariantForm({ data }) {


    const variantFetcher = useFetcher();
    const variantDelete = useFetcher();
    const [variant, setVariant] = useState({ id: -1, title: '', description: '', price: '', salePrice: '', method: "POST", action: '/variants/new' })
    const variants = mainStore((state) => state.variants);
    const setVariants = mainStore((state) => state.setVariants);
    const options = mainStore((state) => state.options);
    const [showModal, setShowModal] = useState(false);

    const addVariantHandler = useCallback((e) => {
        e.preventDefault();
        setVariant({ id: -1, title: '', description: '', price: '', salePrice: '', method: "POST", action: '/variants/new' })
        setShowModal(true);
    }, [variant])

    useEffect(() => {
        if (variantDelete.data) {
            setVariants(variants.filter((_, i) => i === variantDelete.data.id));
        }

    }, [variantDelete.data])

    useEffect(() => {


        if (variantFetcher.data) {
            setShowModal(false);
            let existingVariant = variants.findIndex((variant) => variant.id === variantFetcher.data.id);

            if (existingVariant > -1) {
                variants[existingVariant] = variantFetcher.data;
                setVariants([...variants]);
            } else {
                setVariants([...variants, variantFetcher.data]);
            }
        }

    }, [variantFetcher.data])

    return (
        <>
            <div>
                <div className="mb-2 block">
                    <Button onClick={addVariantHandler}>Add Variant</Button>
                </div>


            </div>

            {variants.map((variant, index) => (
                <div key={`variant-div-${index}`}>
                    <div className="flex flex-wrap">
                        <h3>{variant.title}</h3>
                        <Button onClick={() => {
                            setVariant({
                                id: variant.id,
                                title: variant.title,
                                description: variant.description,
                                price: variant.price,
                                salePrice: variant.salePrice,
                                method: "PUT",
                                action: `/variants/${variant.id}/edit`
                            });
                            setShowModal(true);
                        }
                        } color="gray">Edit</Button>
                        <variantDelete.Form method="DELETE" action={`/variants/delete/${variant.id}`} key={`delete-${index}`}>
                            <Button color="red" key={`submit-delete-${index}`} type="submit">Delete</Button>
                        </variantDelete.Form>
                    </div>

                </div>
            )
            )}

            <Modal onClose={() => setShowModal(false)} show={showModal}>
                <Modal.Header></Modal.Header>
                <Modal.Body>
                    <variantFetcher.Form
                        encType={process.env.NODE_ENV !== 'test' ? "multipart/form-data" : "application/x-www-form-urlencoded"}
                        method={variant.method}
                        action={variant.action}
                        key={`form-${variant.id}`}
                    >
                        {data.productId && <input type="hidden" name="productId" value={data.productId} />}
                        <div key={`variant-title-${variant.id}`}>
                            <div className="mb-2 block">
                                <Label htmlFor="variantTitle" value="Variant Title" />
                            </div>
                            <TextInput id="variantTitle" name="title" defaultValue={variant.title} />
                        </div>
                        <div key={`variant-description-${variant.id}`}>
                            <div className="mb-2 block">
                                <Label htmlFor="variantDescription" value="Variant Description" />
                            </div>
                            <Textarea id="variantDescription" name="description" defaultValue={variant.description} />
                        </div>

                        <div key={`variant-price-${variant.id}`}>
                            <div className="mb-2 block">
                                <Label htmlFor="variantPrice" value="Variant Price" />
                            </div>
                            <TextInput id="variantPrice" name="price" defaultValue={variant.price} />
                        </div>

                        <div key={`variant-salePrice-${variant.id}`}>
                            <div className="mb-2 block">
                                <Label htmlFor="variantSalePrice" value="Sale Price" />
                            </div>
                            <TextInput id="variantSalePrice" name="salePrice" defaultValue={variant.salePrice} />
                        </div>

                        {options.map((option, index) => (
                            <div key={`variant-option-${variant.id}-${index}`}>
                                <div className="block mb-2">
                                    <Label htmlFor={option.key} value={option.key} />
                                </div>
                                <Select id={option.key} key={`${option.key}-${index}`} name={option.key}>
                                    <option value="">{`Select ${option.key}`}</option>
                                    {option.value.split(',').map((value) => (
                                        <option key={value} value={value}>{value}</option>

                                    ))}
                                </Select>

                            </div>
                        ))}

                        <div className="mt-4">
                            <FileInput name="image" id="image" accept="image/*" />
                        </div>

                        <div className="mt-4">
                            <Button type="submit">Save variant</Button>
                        </div>
                    </variantFetcher.Form>
                </Modal.Body>
            </Modal>




        </>
    )
}

