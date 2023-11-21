import express from "express";

export class StripePaymentRouter {
    router: express.Router;

    constructor(public paymentsController) {
        this.router = express.Router();

        this.init();
        return this;
    }

    public init() {
        this.router.get(
            "/hello",
            (req, res) => res.send("Hello World")
        );

        this.router.post(
            "/stripe/secret",
            this.paymentsController.createSecret
        );

        this.router.post(
            "/stripe/order",
            this.paymentsController.createOrder
        );


    }
}