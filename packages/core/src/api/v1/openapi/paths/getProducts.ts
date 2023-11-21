export default {
    summary: "Get all products",
    responses: {
        200: {
            description: "A list of products",
            content: {
                "application/json": {
                    schema: {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Product"
                        }
                    }
                }
            }
        }
    }
}