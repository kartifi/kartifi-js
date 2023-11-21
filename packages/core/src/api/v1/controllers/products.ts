import { Request, Response, NextFunction } from 'express';
import { ProductsService } from '../services/products';

export class ProductsController {
    constructor(public productsService: ProductsService) {
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.show = this.show.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

    }

    public async index(req: Request, res: Response, next: NextFunction) {
        try {
            let products = await this.productsService.index();
            res.send(products);
        } catch (e) {
            next(e);
        }

    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            await this.productsService.create(req.body)
            res.status(201).send();
        } catch (e) {
            next(e);
        }
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        try {
            let product = await this.productsService.show(parseInt(req.params.id));
            res.send(product);
        } catch (e) {
            next(e);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            await this.productsService.update(req.params.id, req.body);
            res.status(204).send();
        } catch (e) {
            next(e);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await this.productsService.delete(req.params.id);
            res.status(204).send();
        } catch (e) {
            next(e);
        }
    }
}
