import { Request, Response } from 'express';
import { UsersService } from '../services/users';

export class UsersController {
    constructor(public usersService: UsersService) {
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.login = this.login.bind(this);
        this.resetPasswordInit = this.resetPasswordInit.bind(this);
        this.resetPasswordFinish = this.resetPasswordFinish.bind(this);
    }

    public async index(req: Request, res: Response) {
        res.send(await this.usersService.index());
    }

    public async create(req: Request, res: Response, next: Function) {
        try {
            await this.usersService.create(req);
            res.status(201).send();
        } catch (error) {

            next(error);
        }

    }

    public async login(req: Request, res: Response, next: Function) {
        try {
            await this.usersService.login(req);
            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }



    public async resetPasswordInit(req: Request, res: Response, next: Function) {
        try {
            await this.usersService.resetPasswordInit(req);
            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }

    public async resetPasswordFinish(req: Request, res: Response, next: Function) {
        try {
            await this.usersService.resetPasswordFinish(req);
            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }
}
