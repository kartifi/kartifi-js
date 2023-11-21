export default {
    "type": "object",
    "properties": {
        "id": {
            "type": "number",
            "readOnly": true
        },
        "name": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "status": {
            "type": "string"
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