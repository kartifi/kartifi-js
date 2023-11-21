import config from "../../config";

export const CreateLineItemRoute = {
    path: "/line-items",

    action: async ({ params, request }) => {
        let formData = await request.formData();
        let variantId = formData.get('variantId');


        if (variantId === '') {
            return null;
        }
        else {
            let data = JSON.stringify(Object.fromEntries(formData));
            let res = await fetch(`${config.BASE_URL}/line-items/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            });

            let lineItem = await res.json();
            return lineItem;
        }
    }
}