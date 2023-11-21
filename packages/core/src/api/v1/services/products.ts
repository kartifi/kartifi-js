import { BaseService } from "./base";
import { Product } from "../models/product";
import { Repository } from "typeorm";

export class ProductsService extends BaseService {
    productsRepo: Repository<Product>;

    constructor() {
        super();
        this.productsRepo = this.db.getRepository(Product);
    }

    public async index() {
        const products = await this.productsRepo.find({

        });
        return products;
    }

    public async create(product) {
        const newProduct = new Product();
        newProduct.title = product.title;
        newProduct.description = product.description;
        // newProduct.status = product.status;
        newProduct.options = product.options;
        newProduct.variants = product.variants;

        return await this.productsRepo.save(newProduct);

    }

    public async show(id: number) {
        const product = await this.productsRepo.findOne({
            where: {
                id: id
            },
            relations: {
                options: true,
                variants: {
                    image: true,
                    options: true
                }
            }
        });

        return product;
    }

    public async update(id: string, product) {
        const newProduct = await this.productsRepo.findOne({
            where: {
                id: Number(id)
            }
        });
        newProduct!.title = product.title;
        newProduct!.description = product.description;
        // newProduct!.status = product.status;
        newProduct!.options = product.options;
        newProduct!.variants = product.variants;

        return await this.productsRepo.save(newProduct!);
    }

    public async delete(id: string) {
        const product = await this.productsRepo.findOne({
            where: {
                id: Number(id)
            }
        });
        return await this.productsRepo.softRemove(product!);

    }
}