import { Request, Response, NextFunction } from 'express';
import { OrdersService } from '../services/orders';

export class OrdersController {
    constructor(public ordersService: OrdersService) {
        this.index = this.index.bind(this);
        // this.create = this.create.bind(this);
        this.show = this.show.bind(this);
        // this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

    }

    public async index(req: Request, res: Response, next: NextFunction) {
        try {
            let orders = await this.ordersService.index();
            res.send(orders);
        } catch (e) {
            next(e);
        }

    }

    // public async create(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         await this.ordersService.create(req.body)
    //         res.status(201).send();
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    public async show(req: Request, res: Response, next: NextFunction) {
        try {
            let order = await this.ordersService.show(parseInt(req.params.id));
            res.send(order);
        } catch (e) {
            next(e);
        }
    }

    // public async update(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         await this.ordersService.update(req.params.id, req.body);
    //         res.status(204).send();
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await this.ordersService.delete(req.params.id);
            res.status(204).send();
        } catch (e) {
            next(e);
        }
    }
}
