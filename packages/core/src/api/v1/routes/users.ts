import express from "express";
import createUser from "../openapi/paths/user/create";
import getUsers from "../openapi/paths/user/get";
import loginUser from "../openapi/paths/user/login";

import { UsersController } from "../controllers/users";
import authUser from "../middlewares/auth-user";

export class UsersRouter {
    router: express.Router;

    constructor(public appContainer, public usersController: UsersController) {
        this.router = express.Router();
        this.appContainer.app.use("/users", this.router);
        this.init();
    }

    private init() {
        this.router.get(
            "/",
            this.appContainer.oapi.path(getUsers),
            authUser,
            this.usersController.index
        );

        this.router.post(
            "/signup",
            this.appContainer.oapi.path(createUser),
            this.usersController.create
        );

        this.router.post(
            "/login",
            this.appContainer.oapi.path(loginUser),
            this.usersController.login
        );


        this.router.get(
            "/reset-password/",
            // TODO: Fix this
            // this.appContainer.oapi.path(createUser),
            this.usersController.resetPasswordInit
        );

        this.router.post(
            "/reset-password/:code",
            // TODO: Fix this
            // this.appContainer.oapi.path(createUser),            
            this.usersController.resetPasswordFinish
        )
    }
}