import express from "express";
// import getOrders from "../openapi/paths/getOrders";
// import createOrder from "../openapi/paths/createOrder";

export class OrdersRouter {
    router: express.Router;

    constructor(public appContainer, public ordersController) {
        this.router = express.Router();
        this.appContainer.app.use("/orders", this.router);
        this.init();
    }

    private init() {
        this.router.get(
            "/",
            // this.appContainer.oapi.path(getOrders),
            this.ordersController.index
        );

        // this.router.post(
        //     "/",
        //     this.appContainer.oapi.path(createOrder),
        //     this.ordersController.create
        // );

        this.router.get(
            "/:id",
            this.ordersController.show
        );

        // this.router.put(
        //     "/:id",
        //     this.ordersController.update
        // );

        this.router.delete(
            "/:id",
            this.ordersController.delete
        );
    }
}