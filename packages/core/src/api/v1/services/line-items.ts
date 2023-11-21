import { BaseService } from "./base";
import { LineItem } from "../models/line-item";
import { Repository } from "typeorm";
import { ProductVariant } from "../models/product-variant";
import { Cart } from "../models";

export class LineItemService extends BaseService {
    lineItemsRepo: Repository<LineItem>;
    cartRepo: Repository<Cart>;

    constructor() {
        super();
        this.lineItemsRepo = this.db.getRepository(LineItem);
        this.cartRepo = this.db.getRepository(Cart);
    }

    // public async index() {
    //     const lineItems = await this.lineItemsRepo.find({

    //     });
    //     return lineItems;
    // }

    public async create(lineItem) {
        let variant = await this.db.getRepository(ProductVariant).findOne({
            where: {
                id: Number(lineItem.variantId)
            }
        });
        const newLineItem = new LineItem();
        newLineItem.quantity = lineItem.quantity;
        newLineItem.variant = variant!;

        return await this.lineItemsRepo.save(newLineItem);

    }

    // public async show(id: string) {
    //     const lineItem = await this.lineItemsRepo.findOne({
    //         where: {
    //             id: Number(id)
    //         }
    //     });

    //     return lineItem;
    // }

    public async update(req) {
        const cart = await this.cartRepo.findOne({
            where: {
                sessionId: req.sessionID
            }
        });
        const newLineItem = await this.lineItemsRepo.findOne({
            where: {
                id: Number(req.params.id),
                cart: cart!

            }
        });
        newLineItem!.quantity = newLineItem!.quantity + parseInt(req.body.quantity);

        return await this.lineItemsRepo.save(newLineItem!);
    }

    // public async delete(id: string) {
    //     const lineItem = await this.lineItemsRepo.findOne({
    //         where: {
    //             id: Number(id)
    //         }
    //     });
    //     return await this.lineItemsRepo.softRemove(lineItem!);

    // }
}