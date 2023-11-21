import { Request, Response, NextFunction } from 'express';
import { StripeService } from '../services/payment';

export class StripePaymentsController {
    constructor(public stripeService: StripeService) {
        // this.index = this.index.bind(this);
        this.createSecret = this.createSecret.bind(this);
        this.createOrder = this.createOrder.bind(this);
        // this.update = this.update.bind(this);

    }



    public async createSecret(req: Request, res: Response, next: NextFunction) {
        try {
            let clientSecret = await this.stripeService.createClientSecret(req);

            res.send({ clientSecret });
        } catch (e) {
            next(e);
        }
    }

    public async createOrder(req: Request, res: Response, next: NextFunction) {
        try {

            const order = await this.stripeService.createOrder(req);
            res.status(200).send(order);
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