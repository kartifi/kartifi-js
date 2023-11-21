import express from "express";

export class ShippoRouter {
    router: express.Router;

    constructor(public shippoController) {
        this.router = express.Router();

        this.init();
        return this;
    }

    public init() {
        this.router.post(
            "/shippo/rates",
            this.shippoController.getRates
        );


    }
}