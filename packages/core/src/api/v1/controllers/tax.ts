import { Request, Response, NextFunction } from 'express';
import { TaxesService } from "../services/tax";

export class TaxesController {
    constructor(public taxService: TaxesService) {
        this.calculate = this.calculate.bind(this);
    }

    public async calculate(req: Request, res: Response, next: NextFunction) {
        try {
            let tax = await this.taxService.calculate(req.body);
            res.send({ tax });
        } catch (e) {
            next(e);
        }
    }
}