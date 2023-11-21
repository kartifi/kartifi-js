import express from "express";
import authCustomer from "../middlewares/auth-customer";

export class AddressesRouter {
    router: express.Router;

    constructor(public appContainer, public addressesController) {
        this.router = express.Router();
        this.appContainer.app.use("/address", authCustomer, this.router);
        this.init();
    }

    public init() {
        this.router.get(
            "/",
            this.addressesController.index
        );

        this.router.post(
            "/",
            this.addressesController.create
        );

        this.router.put(
            "/:id",
            this.addressesController.update
        );
    }
}