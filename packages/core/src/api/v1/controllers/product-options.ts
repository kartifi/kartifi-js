import { NextFunction, Request, Response } from 'express';
import { ProductOptionService } from '../services/product-options';

export class ProductOptionController {
    constructor(public productOptionService: ProductOptionService) {

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            let option = await this.productOptionService.create(req);
            res.send(option);
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            let option = await this.productOptionService.update(req);
            res.send(option);
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            let option = await this.productOptionService.delete(req);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

}