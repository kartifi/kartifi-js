import { Request, Response, NextFunction } from 'express';
import { VariantsService } from '../services/variants';

export class VariantsController {
    constructor(public variantsService: VariantsService) {

        this.create = this.create.bind(this);

    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            let variant = await this.variantsService.create(req.body, req.file)
            res.send(variant);
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