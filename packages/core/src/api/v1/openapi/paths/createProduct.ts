export default {
    summary: "Create a new product",
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    "$ref": "#/components/schemas/Product"
                }
            }
        }
    },
    responses: {
        201: {
            description: "The newly created product",
            content: {
                "application/json": {
                    schema: {
                        "$ref": "#/components/schemas/Product"
                    }
                }
            }
        }
    }
}