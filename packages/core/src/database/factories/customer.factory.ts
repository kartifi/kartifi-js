import { Customer } from "../../api/v1/models/customer";

import bcrypt from 'bcrypt';

export const CustomerFactory = async (count: number = 1) => {
    let customers: Customer[] = [];
    for (let index = 0; index < count; index++) {
        let customer = new Customer
        customer.email = "umair@gmail.com";
        customer.password = await bcrypt.hash("12345678", 10);
        customer.verified = true;

        customers.push(customer);

    }
    return customers;
}