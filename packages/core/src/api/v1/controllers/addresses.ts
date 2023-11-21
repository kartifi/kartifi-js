import { Request, Response, NextFunction } from 'express';
import { AddressesService } from '../services/addresses';

export class AddressesController {
    constructor(public addressesService: AddressesService) {
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);

    }

    public async index(req: Request, res: Response, next: NextFunction) {
        try {
            let customer = req.session.customer
            let addresses = await this.addressesService.index(customer);
            res.send(addresses);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            let customer = req.session.customer
            let address = await this.addressesService.create(req.body, customer)
            res.send(address);
        } catch (e) {
            next(e);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            let customer = req.session.customer
            let address = await this.addressesService.update(req.params.id, req.body, customer)
            res.send(address);
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