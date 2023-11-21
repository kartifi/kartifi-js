import { bootLoaders } from "../src/main";
import { db } from "../src/loaders/database";
import { appContainer } from "../src/loaders/express";
import { User } from "../src/api/v1/models/user";
import request from "supertest";
import { beforeAll, afterAll, expect, it, describe } from "@jest/globals";

var serverAddr: string;
var cookies;

beforeAll(async () => {
    await bootLoaders();
    serverAddr = `http://localhost:${process.env.PORT}/`;

});

afterAll(async () => {
    await db.destroy();
    appContainer.server.close();
})

describe("Users route", () => {
    it("should create a user", async () => {
        const response = await request(serverAddr)
            .post("users/signup")
            .send({
                email: "umair@gmail.com",
                password: "123456"
            });

        expect(response.status).toBe(201);

    });

    it("should throw error if email already exists", async () => {
        const response = await request(serverAddr)
            .post("users/signup")
            .send({
                email: "umair@gmail.com",
                password: "123456"
            });

        expect(response.status).toBe(500);
    });


    it("should login a user", async () => {
        const response = await request(serverAddr)
            .post("users/login")
            .send({
                email: "umair@gmail.com",
                password: "123456"
            });


        expect(response.status).toBe(200);
    });

    it("should throw error if password is incorrect", async () => {
        const response = await request(serverAddr)
            .post("users/login")
            .send({
                email: "umair@gmail.com",
                password: "1234567"
            });

        expect(response.status).toBe(500);
    });

    it("should initiate password reset", async () => {
        const res = await request(serverAddr)
            .post("users/login")
            .send({
                email: "umair@gmail.com",
                password: "123456"
            })


        let cookies = res.headers["set-cookie"][0].split(";")[0];

        const response = await request(serverAddr)
            .get("users/reset-password")
            .set("Cookie", cookies);

        expect(response.status).toBe(200);
    });

    it("should finish password reset", async () => {
        let userRepo = db.getRepository(User);
        let user = await userRepo.findOne({
            where: {
                email: "umair@gmail.com"
            }
        });

        const response = await request(serverAddr)
            .post(`users/reset-password/${user!.resetCode}`)
            .send({
                password: "12345678"
            });

        expect(response.status).toBe(200);
    });




})