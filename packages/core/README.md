To run the project, simply run the following command in the root

```bash
$ docker-compose up -d 
```

Now access the server in your project by visiting `localhost:3000/products`. You can also access the API docs at `localhost:3000/redoc` or `localhost:3000/swaggerui`

The high level overview of directory structure to organize code is as follows: 
```bash
src
├── api
│   └── v1
│       ├── controllers
│       ├── middlewares
│       ├── models
│       ├── openapi
│       ├── routes
│       ├── server.ts
│       └── services
├── loaders
│   ├── database.ts
│   └── express.ts
└── main.ts
```