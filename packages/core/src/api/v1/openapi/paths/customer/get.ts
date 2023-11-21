export default {
    summary: "Get all customers",
    security: [
        {
            basicAuth: {
                $ref: "#/components/securitySchemes/basicAuth"
            }
        }
    ],
    responses: {
        200: {
            description: "A list of customers",
            content: {
                "application/json": {
                    schema: {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Customer"
                        }
                    }
                }
            }
        },
        401: {
            description: "Unauthorized"
        }
    }
}