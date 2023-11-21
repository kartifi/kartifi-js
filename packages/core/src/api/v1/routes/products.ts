import express from "express";
import getProducts from "../openapi/paths/getProducts";
import createProduct from "../openapi/paths/createProduct";

export class ProductsRouter {
    router: express.Router;

    constructor(public appContainer, public productsController) {
        this.router = express.Router();
        this.appContainer.app.use("/products", this.router);
        this.init();
    }

    private init() {
        this.router.get(
            "/",
            this.appContainer.oapi.path(getProducts),
            this.productsController.index
        );

        this.router.post(
            "/",
            this.appContainer.oapi.path(createProduct),
            this.productsController.create
        );

        this.router.get(
            "/:id",
            this.productsController.show
        );

        this.router.put(
            "/:id",
            this.productsController.update
        );

        this.router.delete(
            "/:id",
            this.productsController.delete
        );
    }
}