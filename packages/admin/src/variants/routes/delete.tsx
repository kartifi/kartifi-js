import config from "../../config";

export let DeleteOptionRoute = {
    path: "variants/:id/delete",


    action: async ({ params }) => {



        await fetch(config.BASE_URL + `/variants/${params.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",

        })


        return { id: params.id };
    }
}