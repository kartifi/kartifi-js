export default {
    summary: "Login a users",
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
        200: {
            description: "The user is logged in",

        }
    }
}