export default {
    summary: "Create a new customer",
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    "$ref": "#/components/schemas/Customer"
                }
            }
        }
    },
    responses: {
        201: {
            description: "The newly created customer",

        }
    }
}