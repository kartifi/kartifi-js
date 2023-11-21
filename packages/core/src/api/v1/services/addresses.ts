import { BaseService } from "./base";
import { Address } from "../models/address";
import { Repository } from "typeorm";


export class AddressesService extends BaseService {
    addressesRepo: Repository<Address>;

    constructor() {
        super();
        this.addressesRepo = this.db.getRepository(Address);
    }

    public async index(customer) {
        const addresses = await this.addressesRepo.find({
            where: {
                customer: customer
            }
        });
        return addresses;
    }

    public async create(address, customer) {
        let newAddress = new Address();
        newAddress.firstName = address.firstName;
        newAddress.lastName = address.lastName;
        newAddress.streetAddress1 = address.streetAddress1;
        newAddress.streetAddress2 = address.streetAddress2;
        newAddress.city = address.city;
        newAddress.state = address.state;
        newAddress.country = address.country;
        newAddress.zipCode = address.zipCode;
        newAddress.phoneNumber = address.phoneNumber;
        newAddress.type = address.type;
        newAddress.title = address.title;
        newAddress.sticky = address.sticky;
        newAddress.customer = customer;

        return await this.addressesRepo.save(newAddress);

    }

    // public async show(id: string) {
    //     const lineItem = await this.addressesRepo.findOne({
    //         where: {
    //             id: Number(id)
    //         }
    //     });

    //     return lineItem;
    // }

    public async update(id: string, address, customer) {
        const addressToUpdate = await this.addressesRepo.findOne({
            where: {
                id: Number(id),
                customer: customer
            }
        });

        addressToUpdate!.firstName = address.firstName;
        addressToUpdate!.lastName = address.lastName;
        addressToUpdate!.streetAddress1 = address.streetAddress1;
        addressToUpdate!.streetAddress2 = address.streetAddress2;
        addressToUpdate!.city = address.city;
        addressToUpdate!.state = address.state;
        addressToUpdate!.country = address.country;
        addressToUpdate!.zipCode = address.zipCode;
        addressToUpdate!.phoneNumber = address.phoneNumber;
        addressToUpdate!.type = address.type;
        addressToUpdate!.title = address.title;
        addressToUpdate!.sticky = address.sticky;

        return await this.addressesRepo.save(addressToUpdate!);
    }

    public async delete(id: string, customer) {
        const address = await this.addressesRepo.findOne({
            where: {
                id: Number(id),
                customer: customer
            }
        });
        return await this.addressesRepo.softRemove(address!);

    }
}