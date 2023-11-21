export default {
    summary: "Create a new user",
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    "$ref": "#/components/schemas/User"
                }
            }
        }
    },
    responses: {
        201: {
            description: "The user has been created",

        }
    }
}