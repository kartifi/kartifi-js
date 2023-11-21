import config from "../../config";

export const TaxRoute = {
    path: "/tax",
    action: async ({ request }) => {
        let data = await request.json();
        let res = await fetch(`${config.BASE_URL}/tax`, {
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