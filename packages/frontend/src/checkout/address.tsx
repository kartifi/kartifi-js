import { BillingAddress, ShippingAddress } from "../address";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Amount } from "./amount";
import { Payment } from "./payment";
import config from "../config";
import { Shipping } from "./shipping";
import { mainStore } from "../store";


export function CheckoutAddress({ data }) {
    const shipping = mainStore((state: any) => state.shipping);
    const shippingId = mainStore((state: any) => state.shippingId);
    const [shippingAddresses, setShippingAddresses] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({
        id: 0,
        title: "",
    });

    const [billingAddresses, setSBillingAddresses] = useState([]);
    const [billingAddress, setBillingAddress] = useState({
        id: 0,
        title: "",
    });

    // let billingAddresses = data.addresses.filter((address: any) => address.type === "billing");
    // let billingAddress = billingAddresses.find((address: any) => address.sticky === true) || billingAddresses[0];
    const [same, setSame] = useState(true);


    const [clientSecret, setClientSecret] = useState(undefined);

    useEffect(() => {
        if (data.addresses.length > 0) {
            setShippingAddresses(data.addresses.filter((address: any) => address.type == "shipping"));
            setSBillingAddresses(data.addresses.filter((address: any) => address.type == "billing"));
        }
    }, [data])

    useEffect(() => {
        if (shippingAddresses) {
            setShippingAddress(shippingAddresses.find((address: any) => address.sticky == true) || shippingAddresses[0]);
        }
        if (billingAddresses) {
            setBillingAddress(billingAddresses.find((address: any) => address.sticky == true) || billingAddresses[0]);
        }
    }, [shippingAddresses, billingAddresses])

    useEffect(() => {


        if (shippingId && shippingAddress && data.cart.lineItems.length > 0) {
            fetch(`${config.BASE_URL}/stripe/secret`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    shippingId,
                    shippingAddress,
                    billingAddress: same ? shippingAddress : billingAddress,

                })
            }).then(res => res.json())
                .then(data => setClientSecret(data.clientSecret));
        }
    }, [shippingAddress, data, billingAddress, same, shippingId])



    return (
        <>
            <div className="w-2/4">
                <h1>Checkout</h1>
                <div>
                    <p>Shipping Address</p>
                    {shippingAddress && <div>Ship to: {shippingAddress.title} </div>}
                    {!shippingAddress && <ShippingAddress data={{}} />}
                </div>
                <p>Billing Address</p>
                <div className="w-1/4">

                    <Label htmlFor="same" value="Same as shipping address" />

                    <TextInput id="same" name="same" type="checkbox" defaultChecked={same} onChange={() => setSame(!same)} />
                </div>
                <div>

                    {same ? <div>Bill to: Shipping Address</div> : (
                        <div>

                            {billingAddress && <div>Bill to: {billingAddress.title} </div>}
                            {!billingAddress && <BillingAddress data={{}} />}
                        </div>
                    )}

                    {<Shipping key={shippingAddress?.id || 0} data={{ address: shippingAddress }} />}
                    {clientSecret && <Payment data={{ clientSecret }} />}

                </div>
            </div>

            <Amount key={shippingAddress?.id || 0} data={{ cart: data.cart, address: shippingAddress, shipping }} />
        </>
    )
}