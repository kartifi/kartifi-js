import { Request, Response, NextFunction } from 'express';
import { ImagesService } from '../services/images';

export class ImagesController {
    constructor(public imagesService: ImagesService) {

        this.create = this.create.bind(this);

    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            await this.imagesService.create(req.body)
            res.status(201).send();
        } catch (e) {
            next(e);
        }
    }

}