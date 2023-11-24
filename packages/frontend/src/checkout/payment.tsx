import { loadStripe, } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import config from "../config"
import { StripeForm } from "./stripe-form";




export function Payment({ data }) {
    const stripePromise = loadStripe(config.STRIPE_KEY);
    return (
        <>
            <h2>Payment</h2>
            <Elements stripe={stripePromise} options={{ clientSecret: data.clientSecret }}>
                <StripeForm />
            </Elements>
        </>
    )
}