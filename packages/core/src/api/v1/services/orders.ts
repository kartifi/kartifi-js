import { BaseService } from "./base";
import { Repository } from "typeorm";
import { Order } from "../models";
export class OrdersService extends BaseService {
    ordersRepo: Repository<Order>;

    constructor() {
        super();
        this.ordersRepo = this.db.getRepository(Order);
    }

    public async index() {
        const orders = await this.ordersRepo.find({
            relations: {
                customer: true,
                cart: {
                    payment: true,
                    shipment: true,
                }
            }
        });
        return orders;
    }

    // public async create(order) {
    //     const newOrder = new Order();
    //     newOrder.title = order.title;
    //     newOrder.description = order.description;
    //     // newOrder.status = order.status;
    //     newOrder.options = order.options;
    //     newOrder.variants = order.variants;

    //     return await this.ordersRepo.save(newOrder);

    // }

    public async show(id: number) {
        const order = await this.ordersRepo.findOne({
            where: {
                id: id
            },
            relations: {
                customer: true,
                cart: {
                    payment: true,
                    shipment: true,
                }
            }
        });

        return order;
    }

    // public async update(id: string, order) {
    //     const newOrder = await this.ordersRepo.findOne({
    //         where: {
    //             id: Number(id)
    //         }
    //     });
    //     newOrder!.title = order.title;
    //     newOrder!.description = order.description;
    //     // newOrder!.status = order.status;
    //     newOrder!.options = order.options;
    //     newOrder!.variants = order.variants;

    //     return await this.ordersRepo.save(newOrder!);
    // }

    public async delete(id: string) {
        const order = await this.ordersRepo.findOne({
            where: {
                id: Number(id)
            }
        });
        return await this.ordersRepo.softRemove(order!);

    }
}