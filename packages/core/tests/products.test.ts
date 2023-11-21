import { bootLoaders } from "../src/main";
import { db } from "../src/loaders/database";
import { appContainer } from "../src/loaders/express";
import request from "supertest";
import { beforeAll, afterAll, expect, it, describe } from "@jest/globals";

beforeAll(async () => {
    await bootLoaders();
});

afterAll(async () => {
    await db.destroy();
    appContainer.server.close();
})

describe("Products Route", () => {
    it("should create a product", async () => {
        const response = await request("http://localhost:3001/")
            .post("products")
            .send({
                name: "test",
                description: "test",
                status: "test",
                price: 1.0
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.id).toBe(1);

    });
})