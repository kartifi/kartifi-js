import { bootLoaders } from "../src/main";
import { db } from "../src/loaders/database";
import { appContainer } from "../src/loaders/express";
import { Customer } from "../src/api/v1/models/customer";
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

describe("Customers route", () => {
    it("should create a customer", async () => {
        const response = await request(serverAddr)
            .post("customers/signup")
            .send({
                email: "umair@gmail.com",
                password: "123456"
            });

        expect(response.status).toBe(201);

    });

    it("should throw error if email already exists", async () => {
        const response = await request(serverAddr)
            .post("customers/signup")
            .send({
                email: "umair@gmail.com",
                password: "123456"
            });

        expect(response.status).toBe(500);
    });

    it("should not login a customer if email isn't verified", async () => {
        const response = await request(serverAddr)
            .post("customers/login")
            .send({
                email: "umair@gmail.com",
                password: "123456"
            });


        expect(response.status).toBe(500);
    });

    it("should verify a customer", async () => {
        let customerRepo = db.getRepository(Customer);
        let customer = await customerRepo.findOne({
            where: {
                email: "umair@gmail.com"
            }
        });

        const response = await request(serverAddr)
            .get(`customers/verify/${customer!.verificationCode}`);

        expect(response.status).toBe(200);
    });

    it("should throw error if verification code is invalid", async () => {
        const response = await request(serverAddr)
            .get(`customers/verify/918370ee-605c-472c-a02a-d27a6d08ec96`);

        expect(response.status).toBe(500);
    });

    it("should login a customer", async () => {
        const response = await request(serverAddr)
            .post("customers/login")
            .send({
                email: "umair@gmail.com",
                password: "123456"
            });


        expect(response.status).toBe(200);
    });

    it("should throw error if password is incorrect", async () => {
        const response = await request(serverAddr)
            .post("customers/login")
            .send({
                email: "umair@gmail.com",
                password: "1234567"
            });

        expect(response.status).toBe(500);
    });

    it("should initiate password reset", async () => {
        const res = await request(serverAddr)
            .post("customers/login")
            .send({
                email: "umair@gmail.com",
                password: "123456"
            })


        let cookies = res.headers["set-cookie"][0].split(";")[0];

        const response = await request(serverAddr)
            .get("customers/reset-password")
            .set("Cookie", cookies);

        // console.log(response);



        expect(response.status).toBe(200);
    });

    it("should finish password reset", async () => {
        let customerRepo = db.getRepository(Customer);
        let customer = await customerRepo.findOne({
            where: {
                email: "umair@gmail.com"
            }
        });

        const response = await request(serverAddr)
            .post(`customers/reset-password/${customer!.resetCode}`)
            .send({
                password: "12345678"
            });

        expect(response.status).toBe(200);
    });




})