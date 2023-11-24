import { useLoaderData } from "react-router-dom"

export function ShowOrder() {
    const data: any = useLoaderData();

    return (
        <div>
            <h1>Order #{data.id}</h1>
            <p>{data.cart.payment.amount}</p>
        </div>
    )
}