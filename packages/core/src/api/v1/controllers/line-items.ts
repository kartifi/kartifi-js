import { Request, Response, NextFunction } from 'express';
import { LineItemService } from '../services/line-items';
import { tr } from '@faker-js/faker';
export class LineItemsController {
    constructor(public lineItemsService: LineItemService) {

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);

    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            let lineItem = await this.lineItemsService.create(req.body)
            res.send(lineItem);
        } catch (e) {
            next(e);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            let lineItem = await this.lineItemsService.update(req)
            res.send(lineItem);
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