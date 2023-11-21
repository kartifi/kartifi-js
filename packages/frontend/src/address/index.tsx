import { AddressForm } from "./form";

export function ShippingAddress({ data }) {
    data.type = "shipping";
    return (
        <AddressForm data={data} />
    )
}

export function BillingAddress({ data }) {
    data.type = "billing";
    return (
        <AddressForm data={data} />
    )
}