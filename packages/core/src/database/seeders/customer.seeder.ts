
import { Customer } from '../../api/v1/models/customer';
import { db } from '../../loaders/database';
import { CustomerFactory } from '../factories/customer.factory';

export class CustomerSeeder {
    public async run() {
        const customers = await CustomerFactory(1);
        await db.getRepository(Customer).save(customers);
    }
}