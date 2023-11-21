export default {
    "type": "object",
    "properties": {
        "id": {
            "type": "number",
            "readOnly": true
        },
        "email": {
            "type": "string"
        },
        "password": {
            "type": "string"
        },
        "role": {
            "type": "string",
        },
        "createdAt": {
            "type": "string",
            "format": "date-time",
            "readOnly": true
        },
        "updatedAt": {
            "type": "string",
            "format": "date-time",
            "readOnly": true
        },
        "deletedAt": {
            "type": "string",
            "format": "date-time",
            "readOnly": true
        }
    }
}