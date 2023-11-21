import { BaseService, StoreSettings } from "@kartifi/core";
import Shippo from "shippo";


export class ShippoService extends BaseService {
    private shippo: Shippo.Shippo;
    private settingsRepo;
    private parcel;

    constructor() {
        super();
        this.shippo = new Shippo(process.env.SHIPPO_API_KEY!);
        this.settingsRepo = this.db.getRepository(StoreSettings);
        this.parcel = {
            "length": "5",
            "width": "5",
            "height": "5",
            "distance_unit": "in",
            "weight": "2",
            "mass_unit": "lb"
        };
    }

    public async getRate(id: string) {
        let rate = await this.shippo.rate.retrieve(id);

        return rate;
    }

    public async getRates(addressTo) {


        var addressToDeliever: any = {
            "name": addressTo.firstName + " " + addressTo.lastName,
            "street1": addressTo.streetAddress1,
            "city": addressTo.city,
            "state": addressTo.state,
            "zip": addressTo.zipCode,
            "country": addressTo.country
        };



        let storeSettings = await this.settingsRepo.find({
            relations: {
                address: true
            }
        });



        storeSettings = storeSettings[0];


        var addressFrom = {
            "name": storeSettings.name,
            "street1": storeSettings.address.streetAddress1,
            "city": storeSettings.address.city,
            "state": storeSettings.address.state,
            "zip": storeSettings.address.zipCode,
            "country": storeSettings.address.country
        };

        let rates = await this.shippo.shipment.create({
            address_to: addressToDeliever,
            address_from: addressFrom,
            parcels: [this.parcel],
            async: false
        })
        return rates;
    }

}