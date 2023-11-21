import express from "express";
import { upload } from "../middlewares/upload-file";
// import getProducts from "../openapi/paths/getProducts";
// import createProduct from "../openapi/paths/createProduct";

export class VariantsRouter {
    router: express.Router;

    constructor(public appContainer, public variantsController) {
        this.router = express.Router();
        this.appContainer.app.use("/variants", this.router);
        this.init();
    }

    public init() {
        this.router.post(
            "/",
            upload.single("image"),
            (req, res, next) => {
                req.body.options = JSON.parse(req.body.options);
                next();
            },
            this.variantsController.create
        );
    }
}