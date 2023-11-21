import { useCallback, useEffect, useState } from "react"
import config from "../config";
import { mainStore } from "../store";

export function Shipping({ data }) {
    const [address, setAddress] = useState()
    const [rates, setRates] = useState();
    const setShipping = mainStore((state) => state.setShipping);
    const setShippingId = mainStore((state) => state.setShippingId);
    useEffect(() => {
        setAddress(data.address)
    }, [data])

    useEffect(() => {
        if (address) {
            fetch(`${config.BASE_URL}/shippo/rates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ address })
            }).then(res => res.json())
                .then(data => setRates(data.rates));
        }
    }, [address])

    const handleShippingChange = useCallback((e) => {
        let rate = rates.rates.find((rate: any) => rate.object_id === e.target.value);
        setShipping(parseFloat(rate.amount));
        setShippingId(e.target.value);
    }, [rates])

    return (
        <>
            <h2>Choose Shipping:</h2>
            {rates && rates.rates.map((rate: any) => (
                <div key={rate.object_id}>
                    <input type="radio" name="shipping" value={rate.object_id} onChange={handleShippingChange} />
                    <label>{rate.provider} - {rate.amount}</label>
                </div>
            ))}
        </>
    )
}