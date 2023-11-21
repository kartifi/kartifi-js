import { AppContainer } from "../api/v1/server";
import setupRoutes from "../api/v1/controllers";
import express from "express";
import openapi from "@wesleytodd/openapi";
import origin from "../api/v1/middlewares/origin";

export var appContainer;

export default function (port: number) {
    const app = express();
    const oapi = openapi({
        openapi: '3.0.0',
        info: {
            title: 'Express Application',
            description: 'Generated docs from an Express api',
            version: '1.0.0',
        }
    })
    //TODO: Pass port number from config
    appContainer = new AppContainer(app, oapi, port);

    app.use(origin)

    setupRoutes(appContainer);


    app.use((err, req, res, next) => {
        console.log(err.message);

        if (res.headersSent) {
            return next(err)
        }
        res.status(500).send(err.message);
    });
}