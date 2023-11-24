import { redirect } from "react-router-dom";
import config from "../../config";
import { Login } from "../login";

export const LoginRoute = {
    path: '/login',
    element: <Login />,
    action: async ({ request }) => {
        let formData = await request.formData();
        let jsonData = Object.fromEntries(formData.entries());
        let response = await fetch(config.BASE_URL + "/customers/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(jsonData)
        });
        if (response.ok) {
            return redirect("/checkout");

        } else {
            return null;
        }
    }
}