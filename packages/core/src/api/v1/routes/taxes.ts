import express from "express";


export class TaxesRouter {
    router: express.Router;

    constructor(public appContainer, public taxesController) {
        this.router = express.Router();
        this.appContainer.app.use("/tax", this.router);
        this.init();
    }

    public init() {


        this.router.post(
            "/",
            this.taxesController.calculate
        );


    }
}