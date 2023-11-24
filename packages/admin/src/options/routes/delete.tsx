import config from "../../config";

export let DeleteOptionRoute = {
    path: "options/:id/delete",


    action: async ({ params }) => {



        await fetch(config.BASE_URL + `/options/${params.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",

        })

        return { id: params.id };
        // return redirect(`/products/new?action=delete&id=${params.id}`);
    }
}