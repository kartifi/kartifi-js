import express from "express";

export class CartRouter {
    router: express.Router;

    constructor(public appContainer, public cartController) {
        this.router = express.Router();
        this.appContainer.app.use("/cart", this.router);
        this.init();
    }

    public init() {
        this.router.get(
            "/",
            this.cartController.index
        );
        this.router.post(
            "/",
            this.cartController.create
        );
        this.router.put(
            "/:id",
            this.cartController.update
        );
    }
}