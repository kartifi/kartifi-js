
import { Product } from '../../api/v1/models/product';
import { db } from '../../loaders/database';
import { ProductFactory } from '../factories/product.factory';

export class ProductSeeder {
    public async run() {
        const products = await ProductFactory(10);
        await db.getRepository(Product).save(products);
    }
}