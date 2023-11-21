import { createServer, Response, Model, hasMany, belongsTo } from "miragejs"
export function makeServer({ environment = "test" } = {}) {
    let server = createServer({
        environment,
        urlPrefix: "http://localhost:3000/",

        models: {
            product: Model.extend({
                options: hasMany(),
                variants: hasMany(),
            }),
            option: Model.extend({
                product: belongsTo(),
            }),
            variant: Model.extend({
                product: belongsTo(),
                options: hasMany(),
            }),
        },

        seeds(server) {
            server.create("product", {
                id: '1',
                title: "Ergonomic Metal Chair",
                description: "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
                status: "draft",
                options: [
                    {
                        id: 3,
                        key: "Color",
                        value: "Red, Green, Blue",
                        createdAt: "2023-11-04T19:06:11.235Z",
                        updatedAt: "2023-11-04T19:06:11.235Z",
                        deletedAt: null,
                    },
                ],
                variants: [],
                createdAt: "2023-11-04T19:06:11.235Z",
                updatedAt: "2023-11-04T19:06:11.235Z",
                deletedAt: null,
            })
        },


        routes() {
            this.get("/products", () => {
                return [
                    {
                        "id": 1,
                        "title": "Gorgeous Metal Salad",
                        "description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
                        "status": "draft",
                        "createdAt": "2023-11-06T19:39:13.218Z",
                        "updatedAt": "2023-11-06T19:39:13.218Z",
                        "deletedAt": null
                    },
                ]
            });

            this.post("/options", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)

                return {
                    id: 1,
                    key: attrs.key,
                    value: attrs.value,
                }
            });

            this.post("/variant-options", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                return {
                    id: 1,
                    title: attrs.title,
                    value: attrs.value,
                }
            });

            this.post("/variants", async (schema, request) => {
                // console.log("Hit variants");
                // console.log(request.requestBody);
                // let formData = console.log(request.requestBody.has('title'));
                // request.requestBody.has('title')
                let attrs = request.requestBody;
                // console.log(attrs);


                return {
                    "id": 17,
                    "title": attrs.get('title'),
                    "description": attrs.get('description'),
                    "price": attrs.get('price'),
                    "salePrice": attrs.get('salePrice'),
                    "options": [
                        {
                            "id": 38,
                            "title": 'Color',
                            "value": 'Red',
                            "created_at": "2023-11-05T09:52:28.086Z",
                            "updated_at": "2023-11-05T09:52:28.139Z"
                        }
                    ],
                    "createdAt": "2023-11-05T09:52:28.139Z",
                    "updatedAt": "2023-11-05T09:52:28.139Z",
                    "deletedAt": null
                }
            });

            this.post("/products", () => {
                return new Response(201)
            });

            this.get("/products/1", () => {
                return {
                    "id": 1,
                    "title": "Ergonomic Metal Chair",
                    "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
                    "status": "draft",
                    "options": [
                        {
                            "id": 3,
                            "key": "Color",
                            "value": "Red, Green, Blue",
                            "createdAt": "2023-11-04T19:06:11.235Z",
                            "updatedAt": "2023-11-04T19:06:11.235Z",
                            "deletedAt": null
                        }
                    ],
                    "variants": [],
                    "createdAt": "2023-11-04T19:06:11.235Z",
                    "updatedAt": "2023-11-04T19:06:11.235Z",
                    "deletedAt": null
                }
            });

            this.put("/products/:id/", (schema, request) => {

                return new Response(204)
            });
        },
    })

    return server
}