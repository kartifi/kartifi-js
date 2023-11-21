export default {
    summary: "Login a customer",
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
        200: {
            description: "The customer is logged in",

        }
    }
}