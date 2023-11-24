import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "flowbite-react";

export function StripeForm({ }) {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        await stripe.confirmPayment({
            elements,
            confirmParams: {
                // TODO: Make sure to change this to your payment completion page
                return_url: "http://localhost:5173/thanks",
            },
        });


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <Button className="mt-4" type="submit">
                    Place Order
                </Button>
            </form>
        </>
    )

}