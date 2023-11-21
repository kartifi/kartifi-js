import { BaseService } from "./base";
import { ProductOption } from "../models/product-option";
import { Repository } from "typeorm";
import { Request } from "express";
import { Product } from "../models/product";


export class ProductOptionService extends BaseService {
    productOptionsRepo: Repository<ProductOption>;
    productsRepo: Repository<Product>;

    constructor() {
        super();
        this.productOptionsRepo = this.db.getRepository(ProductOption);
        this.productsRepo = this.db.getRepository(Product);
    }

    public async create(req: Request) {
        const productOption = new ProductOption();
        productOption.key = req.body.key;
        productOption.value = req.body.value;
        let product = await this.getProduct(req.body.productId);
        if (product) {
            productOption.product = product;
        }


        return await this.productOptionsRepo.save(productOption);

    }

    public async update(req: Request) {
        const productOption = await this.productOptionsRepo.findOne({
            where: {
                id: parseInt(req.params.id)
            }
        });
        productOption!.key = req.body.key;
        productOption!.value = req.body.value;
        return await this.productOptionsRepo.save(productOption!);
    }

    public async delete(req: Request) {
        const productOption = await this.productOptionsRepo.findOne({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return await this.productOptionsRepo.remove(productOption!);
    }

    private async getProduct(productId: string | null): Promise<Product | null> {
        if (productId) {
            return await this.productsRepo.findOne({
                where: {
                    id: parseInt(productId)
                }
            });
        }
        return null;
    }


}