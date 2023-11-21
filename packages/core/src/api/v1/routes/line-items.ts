import express from "express";

export class LineItemsRouter {
    router: express.Router;

    constructor(public appContainer, public lineItemsController) {
        this.router = express.Router();
        this.appContainer.app.use("/line-items", this.router);
        this.init();
    }

    public init() {
        this.router.post(
            "/",
            this.lineItemsController.create
        );

        this.router.put(
            "/:id",
            this.lineItemsController.update
        );
    }
}