import config from "../../config";
import { EditOption } from "../edit";


export let EditOptionRoute = {
    path: "options/edit/:id",
    element: <EditOption />,

    action: async ({ params, request }) => {


        let formData = await request.formData();
        let data = JSON.stringify(Object.fromEntries(formData));


        let optionData = await fetch(config.BASE_URL + `/options/${params.id}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: data
        })

        return await optionData.json();
        // return redirect(`/products/new?action=edit&id=${option.id}&key=${option.key}&value=${option.value}`);
    }
}