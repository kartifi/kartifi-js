import config from "../../config";

export const PaymentIntentRoute = {
    path: "/payment-intent",
    action: async ({ request }) => {
        let data = await request.json();

        let res = await fetch(`${config.BASE_URL}/stripe/secret`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })

        if (res.status === 200) {
            return res.json();
        }
        else {
            return null;
        }
    }
}