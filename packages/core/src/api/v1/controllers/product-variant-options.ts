import { NextFunction, Request, Response } from 'express';
import { ProductVariantOptionService } from '../services/product-variant-options';

export class ProductVariantOptionController {
    constructor(public productVariantOptionService: ProductVariantOptionService) {

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            let option = await this.productVariantOptionService.create(req);
            res.send(option);
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            let option = await this.productVariantOptionService.update(req);
            res.send(option);
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            let option = await this.productVariantOptionService.delete(req);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

}