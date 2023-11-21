import express from "express";
// import getProducts from "../openapi/paths/getProducts";
// import createProduct from "../openapi/paths/createProduct";

export class ProductOptionRouter {
    router: express.Router;

    constructor(public appContainer, public productOptionController) {
        this.router = express.Router();
        this.appContainer.app.use("/options", this.router);
        this.init();
    }


    private init() {
        this.router.post(
            "/",
            // this.appContainer.oapi.path(createProduct),
            this.productOptionController.create
        );

        this.router.put(
            "/:id",
            // this.appContainer.oapi.path(createProduct),
            this.productOptionController.update
        );

        this.router.delete(
            "/:id",
            // this.appContainer.oapi.path(createProduct),
            this.productOptionController.delete
        );
    }
}