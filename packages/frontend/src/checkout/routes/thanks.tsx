import config from "../../config";
import { Thanks } from "../thanks";

export const ThanksRoute = {
    path: "/thanks",
    element: <Thanks />,
    action: async ({ request }) => {
        let data = await request.json();
        let res = await fetch(`${config.BASE_URL}/stripe/order`, {
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