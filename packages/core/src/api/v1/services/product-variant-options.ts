import { BaseService } from "./base";
import { Repository } from "typeorm";
import { Request } from "express";
import { ProductVariantOption } from "../models/product-variant-option";


export class ProductVariantOptionService extends BaseService {
    productVariantOptionsRepo: Repository<ProductVariantOption>;

    constructor() {
        super();
        this.productVariantOptionsRepo = this.db.getRepository(ProductVariantOption);
    }

    public async create(req: Request) {
        const productVariantOption = new ProductVariantOption();
        productVariantOption.title = req.body.title;
        productVariantOption.value = req.body.value;

        return await this.productVariantOptionsRepo.save(productVariantOption);

    }

    public async update(req: Request) {
        const productOption = await this.productVariantOptionsRepo.findOne({
            where: {
                id: parseInt(req.params.id)
            }
        });
        productOption!.title = req.body.title;
        productOption!.value = req.body.value;
        return await this.productVariantOptionsRepo.save(productOption!);
    }

    public async delete(req: Request) {
        const productOption = await this.productVariantOptionsRepo.findOne({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return await this.productVariantOptionsRepo.remove(productOption!);
    }



}