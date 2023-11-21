import config from "../../config";

export const CreateAddressRoute = {
    path: "/address/new",
    action: async ({ params, request }) => {
        let formData = await request.formData();
        let body = Object.fromEntries(formData.entries());
        let response = await fetch(`${config.BASE_URL}/address`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        return null;

    }
}