import express from "express";
import createCustomer from "../openapi/paths/customer/create";
import getCustomers from "../openapi/paths/customer/get";
import loginCustomer from "../openapi/paths/customer/login";
import verifyCustomer from "../openapi/paths/customer/verify";
import { CustomersController } from "../controllers/customers";
import authCustomer from "../middlewares/auth-customer";

export class CustomersRouter {
    router: express.Router;

    constructor(public appContainer, public customersController: CustomersController) {
        this.router = express.Router();
        this.appContainer.app.use("/customers", this.router);
        this.init();
    }

    private init() {
        this.router.get(
            "/",
            this.appContainer.oapi.path(getCustomers),
            authCustomer,
            this.customersController.index
        );

        this.router.post(
            "/signup",
            this.appContainer.oapi.path(createCustomer),
            this.customersController.create
        );

        this.router.post(
            "/login",
            this.appContainer.oapi.path(loginCustomer),
            this.customersController.login
        );

        this.router.get(
            "/verify/:code",
            this.appContainer.oapi.path(verifyCustomer),
            this.customersController.verify
        );

        this.router.get(
            "/reset-password/",
            // TODO: Fix this
            // this.appContainer.oapi.path(createCustomer),
            this.customersController.resetPasswordInit
        );

        this.router.post(
            "/reset-password/:code",
            // TODO: Fix this
            // this.appContainer.oapi.path(createCustomer),            
            this.customersController.resetPasswordFinish
        )
    }
}