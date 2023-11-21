import { BaseService } from "./base";
import { ProductVariant } from "../models/product-variant";
import { Repository } from "typeorm";
import { Image } from "../models/image";
import { Product } from "../models/product";

export class VariantsService extends BaseService {
    variantsRepo: Repository<ProductVariant>;
    productsRepo: Repository<Product>;

    constructor() {
        super();
        this.variantsRepo = this.db.getRepository(ProductVariant);
        this.productsRepo = this.db.getRepository(Product);
    }

    public async create(variant, image) {
        const newVariant = new ProductVariant();
        newVariant.title = variant.title;
        newVariant.price = variant.price;
        newVariant.salePrice = variant.salePrice;
        newVariant.description = variant.description;
        if (image) {
            newVariant.image = this.getImages(image);
        }
        newVariant.options = variant.options;
        let product = await this.getProduct(variant.productId);
        if (product) {
            newVariant.product = product;
        }

        return await this.variantsRepo.save(newVariant);

    }

    private getImages(image) {
        // return images.map((image) => {
        const newImage = new Image();
        newImage.title = image.originalname;
        newImage.src = image.filename;
        newImage.mimeType = image.mimetype;
        return newImage;
        // })
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