export default {
    summary: "Get all user",
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
                            "$ref": "#/components/schemas/User"
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