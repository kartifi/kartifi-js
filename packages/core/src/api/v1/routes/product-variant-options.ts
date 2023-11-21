import express from "express";
// import getProducts from "../openapi/paths/getProducts";
// import createProduct from "../openapi/paths/createProduct";

export class ProductVariantOptionRouter {
    router: express.Router;

    constructor(public appContainer, public productVariantOptionController) {
        this.router = express.Router();
        this.appContainer.app.use("/variant-options", this.router);
        this.init();
    }

    private init() {


        this.router.post(
            "/",
            // this.appContainer.oapi.path(createProduct),
            this.productVariantOptionController.create
        );

        this.router.put(
            "/:id",
            // this.appContainer.oapi.path(createProduct),
            this.productVariantOptionController.update
        );

        this.router.delete(
            "/:id",
            // this.appContainer.oapi.path(createProduct),
            this.productVariantOptionController.delete
        );
    }
}