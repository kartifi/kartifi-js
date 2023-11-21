import { redirect, useSearchParams } from "react-router-dom";
import config from "../../config";



export let EditOptionRoute = {
    path: "variants/:id/edit",
    // element: <EditVariant />,

    action: async ({ params, request }) => {


        let formData = await request.formData();



        let variantData = await fetch(config.BASE_URL + `/variants/${params.id}/edit`, {
            method: "PUT",
            credentials: "include",
            body: formData
        })

        // let option = await optionData.json();
        return null;
        // return redirect(`/products/new?action=edit&id=${option.id}&key=${option.key}&value=${option.value}`);
    }
}