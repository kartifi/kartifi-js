export default {
    summary: "Verify a customer's email address",
    parameters: [
        {
            name: "code",
            in: "path",
            required: true,
            description: "The verification code",
            schema: {
                type: "string"
            }
        }
    ],
    responses: {
        200: {
            description: "The customer is verified",

        }
    }
}