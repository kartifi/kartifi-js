import express from "express";
import { AppContainer } from "../src/api/v1/server";
import openapi from "@wesleytodd/openapi";
import { beforeEach, afterEach, expect, it, describe, jest } from "@jest/globals";

const app = express();
const oapi = openapi({
    openapi: '3.0.0',
    info: {
        title: 'Express Application',
        description: 'Generated docs from an Express api',
        version: '1.0.0',
    }
})

var appContainer;
var listenSpy;
var useSpy;

beforeEach(() => {
    listenSpy = jest.spyOn(app, "listen");
    useSpy = jest.spyOn(app, "use");
});

afterEach(() => {
    appContainer.server.close();
    jest.clearAllMocks();
})


describe("AppContainer", () => {
    it("should call listen and use", () => {
        appContainer = new AppContainer(app, oapi, 3001);
        expect(listenSpy).toHaveBeenCalled();
        expect(listenSpy).toBeCalledWith(3001, expect.any(Function));
        expect(useSpy).toBeCalledTimes(3);
    });
})
