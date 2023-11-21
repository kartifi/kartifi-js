import express, { Express } from "express";
import ProductSchema from "./openapi/components/schemas/product";
import CustomerSchema from "./openapi/components/schemas/customer";
import UserSchema from "./openapi/components/schemas/user";
import BasicAuth from "./openapi/components/securitySchemes/basic";
import http from "http";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import { cwd } from "process";

export class AppContainer {
    server: http.Server;

    constructor(public app: Express, public oapi: any, public port: number) {
        this.expressSetup(port);
        this.oapiSetup();
    }

    expressSetup(port: number) {
        this.server = this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });

        this.app.use(express.static('public'));

        this.app.use(express.json());

        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(session({
            //TODO: Move this to env
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
        }));

        this.app.use(cors({
            //TODO: Move this to env
            origin: true,
            credentials: true
        }))

        this.app.use(cookieParser());


    }

    oapiSetup() {
        this.app.use(this.oapi);
        this.app.use('/redoc', this.oapi.redoc)
        this.app.use('/swaggerui', this.oapi.swaggerui)
        this.oapi.schema('Product', ProductSchema);
        this.oapi.schema('Customer', CustomerSchema);
        this.oapi.schema('User', UserSchema);
        this.oapi.securitySchemes('basicAuth', BasicAuth);
    }
}