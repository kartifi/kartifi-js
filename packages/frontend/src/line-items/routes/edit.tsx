import config from "../../config";

export const EditLineItemRoute = {
    path: "/line-items/:id/edit",
    action: async ({ params, request }) => {
        let formData = await request.formData();
        let data = JSON.stringify(Object.fromEntries(formData));
        let res = await fetch(`${config.BASE_URL}/line-items/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        let lineItem = await res.json();
        if (res.status === 200) {
            return lineItem;
        }
        else {
            return null;
        }
    }
}