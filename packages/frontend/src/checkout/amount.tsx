import { useEffect, useState } from "react";
import { PriceCalculation } from "../utils/price-calculation";
import { useFetcher } from "react-router-dom";
import { Button } from "flowbite-react";
import { Shipping } from "./shipping";

export function Amount({ data }) {
    const fetcher = useFetcher();
    const [tax, setTax] = useState(0);
    const subTotal = PriceCalculation.calculatePrice(data.cart.lineItems);
    const [total, setTotal] = useState(subTotal);
    useEffect(() => {
        //TODO: get the country from cookies
        if (data.address) {

            fetcher.submit(JSON.stringify(
                {
                    country: data.address.country,
                    state: data.address.state
                }
            ),
                {
                    method: 'POST',
                    action: '/tax',
                    encType: "application/json"
                }
            );
        }


    }, [])

    useEffect(() => {
        console.log(fetcher.data);

        if (fetcher.data) {
            // let rate = fetcher.data[0].rate;
            let rate = fetcher.data.tax.length > 0 ? fetcher.data.tax[0].rate : 0;
            let tax = subTotal * rate;
            setTax(tax)
            setTotal(subTotal + tax + data.shipping)

        }
    }, [fetcher.data, data.shipping])

    return (
        <div className="ml-10 w-1/4">
            {data.cart.lineItems.map((lineItem: any) => (
                <div key={lineItem.id}>
                    <h2>{lineItem.variant.title}</h2>
                    <p>Quantity: {lineItem.quantity}</p>

                </div>

            ))}
            <div>subTotal: {subTotal}</div>
            <div>tax: {tax.toFixed(2)}</div>
            <div>shipping: {data.shipping} </div>
            <div>total: {total.toFixed(2)}</div>

        </div>
    )
}