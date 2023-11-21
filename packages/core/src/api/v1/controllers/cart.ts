import { Request, Response, NextFunction } from 'express';
import { CartService } from '../services/cart';

export class CartController {
    constructor(public cartService: CartService) {
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);

    }

    public async index(req: Request, res: Response, next: NextFunction) {
        try {
            let cart = await this.cartService.index(req.sessionID);
            res.send(cart);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            let cart = await this.cartService.create(req.sessionID, req.body)
            res.send(cart);
        } catch (e) {
            next(e);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            let cart = await this.cartService.update(req.sessionID, req.params.id, req.body);
            res.send(cart);
        } catch (e) {
            next(e);
        }
    }

    // public async delete(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         await this.variantsService.delete(parseInt(req.params.id));
    //         res.status(204).send();
    //     } catch (e) {
    //         next(e);
    //     }
    // }

}