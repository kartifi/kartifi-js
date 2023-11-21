import { useCallback, useEffect, useState } from "react";
import { Form, useFetcher } from "react-router-dom";
import { mainStore } from "../store";
import { Modal, Button, TextInput, Label } from "flowbite-react";

export function OptionForm({ data }) {
    const [showModal, setShowModal] = useState(false);
    const optionFetcher = useFetcher();
    const optionDelete = useFetcher();
    const [option, setOption] = useState({ id: -1, key: '', value: '', method: "POST", action: '/options/new' })
    // const [productOptions, setProductOptions] = useState(data.options);
    const productOptions = mainStore((state) => state.options);
    const setProductOptions = mainStore((state) => state.setOptions);

    useEffect(() => {
        if (optionFetcher.data) {
            setShowModal(false);
            let existingOption = productOptions.findIndex((option) => option.id === optionFetcher.data.id);

            if (existingOption > -1) {
                productOptions[existingOption] = optionFetcher.data;
                setProductOptions([...productOptions])
            } else {
                setProductOptions([...productOptions, optionFetcher.data]);
            }
        }

    }, [optionFetcher.data])

    useEffect(() => {
        if (optionDelete.data) {
            setProductOptions(productOptions.filter((_, i) => i === optionDelete.data.id));
        }

    }, [optionDelete.data])

    const addOptionHandler = useCallback((e) => {
        e.preventDefault();
        setOption({ id: -1, key: '', value: '', method: 'POST', action: '/options/new' });
        setShowModal(true);



    }, [option])

    return (
        <>
            <p>
                <label>

                    <br />
                    <Button onClick={addOptionHandler} className="btn">Add Option</Button>
                </label>
            </p>
            {productOptions.map((option, index) => (
                <div key={`div-${index}`}>
                    <div className="flex flex-wrap">
                        <span>{option.key} : {option.value}</span>
                        <Button className="ml-4" color="gray" onClick={() => {
                            setOption({
                                id: option.id,
                                key: option.key,
                                value: option.value,
                                method: "PUT",
                                action: `/options/${option.id}/edit`
                            });

                            setShowModal(true);

                        }
                        } >Edit</Button>
                        <optionDelete.Form method="DELETE" action={`/options/${option.id}/delete`} key={`delete-${index}`}>
                            <Button color="red" className="ml-4" key={`submit-delete-${index}`} type="submit">Delete</Button>
                        </optionDelete.Form>
                    </div>


                </div>
            )
            )}


            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Modal.Header></Modal.Header>
                <Modal.Body>
                    <optionFetcher.Form
                        method={option.method}
                        action={option.action}
                        key={`form-${option.id}`}
                    >
                        {data.productId && <input type="hidden" name="productId" value={data.productId} />}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="key" value="Option key" />
                            </div>
                            <TextInput id="key" name="key" placeholder="e.g. Color" required defaultValue={option.key} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="value" value="Option value" />
                            </div>
                            <TextInput id="value" name="value" placeholder="e.g. Red, Green, Blue" required defaultValue={option.value} />
                        </div>
                        <div className="mt-4">
                            <Button type="submit">Save option</Button>
                        </div>
                    </optionFetcher.Form>
                </Modal.Body>

            </Modal>



        </>
    )
}

