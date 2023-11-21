import { BaseService } from "./base";
import { Cart } from "../models/cart";
import { Repository } from "typeorm";


export class CartService extends BaseService {
    cartRepo: Repository<Cart>;

    constructor() {
        super();
        this.cartRepo = this.db.getRepository(Cart);
    }

    public async index(sessionId: string) {

        return await this.cartRepo.findOne({
            where: {
                sessionId: sessionId

            },
            relations: {
                lineItems: {
                    variant: {
                        product: true,
                        image: true
                    }
                }
            }
        }) || { lineItems: [] };
    }

    public async create(sessionId, lineItem) {

        let newCart = new Cart();
        newCart.sessionId = sessionId;
        newCart.lineItems = [lineItem];
        return await this.cartRepo.save(newCart);

    }

    public async show(id: string) {
        const cart = await this.cartRepo.findOne({
            where: {
                id: Number(id)
            }
        });

        return cart;
    }

    public async update(sessionId, id: string, lineItem) {
        const cart = await this.cartRepo.findOne({
            where: {
                id: Number(id),
                sessionId: sessionId
            },
            relations: {
                lineItems: {
                    variant: {
                        product: true,
                        image: true
                    }

                }
            }
        });

        cart?.lineItems.push(lineItem);

        return await this.cartRepo.save(cart!);
    }

    public async delete(id: string, sessionId: string) {
        const lineItem = await this.cartRepo.findOne({
            where: {
                id: Number(id),
                sessionId: sessionId
            }
        });
        return await this.cartRepo.softRemove(lineItem!);

    }

}