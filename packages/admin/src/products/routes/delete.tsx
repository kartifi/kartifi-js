import config from "../../config";

export let DeleteProductRoute = {
    path: "products/delete",


    action: async ({ params, request }) => {

        let formData = await request.formData();
        let ids = JSON.parse(formData.get("body"));
        let allPromises = []

        for (let id of ids) {
            let res = fetch(config.BASE_URL + `/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",

            })
            allPromises.push(res)
        }

        await Promise.all(allPromises)

        return { ids: ids };
        // if (res.ok) {
        //     return { id: params.id };

        // } else {
        //     return { id: params.id };
        // }
        // return redirect(`/products/new?action=delete&id=${params.id}`);
    }
}