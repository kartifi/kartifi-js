import { Request, Response } from 'express';
import { CustomersService } from '../services/customers';

export class CustomersController {
    constructor(public customersService: CustomersService) {
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.login = this.login.bind(this);
        this.verify = this.verify.bind(this);
        this.resetPasswordInit = this.resetPasswordInit.bind(this);
        this.resetPasswordFinish = this.resetPasswordFinish.bind(this);
    }

    public async index(req: Request, res: Response) {
        res.send(await this.customersService.index());
    }

    public async create(req: Request, res: Response, next: Function) {
        try {
            await this.customersService.create(req);
            res.status(201).send();
        } catch (error) {

            next(error);
        }

    }

    public async login(req: Request, res: Response, next: Function) {
        try {
            await this.customersService.login(req);
            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }

    public async verify(req: Request, res: Response, next: Function) {
        try {
            await this.customersService.verify(req.params.code);
            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }

    public async resetPasswordInit(req: Request, res: Response, next: Function) {
        try {
            await this.customersService.resetPasswordInit(req);
            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }

    public async resetPasswordFinish(req: Request, res: Response, next: Function) {
        try {
            await this.customersService.resetPasswordFinish(req);
            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }
}
