import { StoreSettings } from "../models/store-settings";
import { BaseService } from "./base";
import salesTax from "sales-tax";

export class TaxesService extends BaseService {

    constructor() {
        super();
    }

    public async calculate(destination) {
        let origin = await this.getOrigin();
        salesTax.setTaxOriginCountry(origin[0]!.address.country || 'US');
        let tax = await salesTax.getSalesTax(destination.country, destination.state)
        return tax.details;
    }

    private async getOrigin() {
        return await this.db.getRepository(StoreSettings).find({
            relations: {
                address: true
            }
        });
    }
}