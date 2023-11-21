import { Request, Response, NextFunction } from 'express';
import { ShippoService } from '../services/shippo';

export class ShippoController {
    constructor(public shippoService: ShippoService) {

        this.getRates = this.getRates.bind(this);



    }



    public async getRates(req: Request, res: Response, next: NextFunction) {
        try {
            let rates = await this.shippoService.getRates(req.body.address);

            res.send({ rates });
        } catch (e) {
            next(e);
        }
    }



}