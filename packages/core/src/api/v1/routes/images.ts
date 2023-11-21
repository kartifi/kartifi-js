import express from "express";
import { upload } from "../middlewares/upload-file";
// import getProducts from "../openapi/paths/getProducts";
// import createProduct from "../openapi/paths/createProduct";

export class ImagesRouter {
    router: express.Router;

    constructor(public appContainer, public imagesController) {
        this.router = express.Router();
        this.appContainer.app.use("/images", this.router);
        this.init();
    }

    public init() {
        this.router.post(
            "/",
            upload.single('file'),
            this.imagesController.create
        );
    }
}