import { faker } from "@faker-js/faker";
import { Address } from "../../api/v1/models/address";

export const AddressFactory = async () => {
    let address = new Address();
    address.firstName = faker.person.firstName();
    address.lastName = faker.person.lastName();
    address.streetAddress1 = "111 Mott street"
    address.streetAddress2 = "Apt 22"
    address.city = "New York";
    address.state = "NY";
    address.country = 'US';
    address.zipCode = '10013';
    address.phoneNumber = faker.phone.number();
    address.type = 'store';
    address.title = 'store';
    return address;

}