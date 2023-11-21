import { BaseService } from "./base";
import { Customer } from "../models/customer";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import { Request } from "express";


export class CustomersService extends BaseService {
    customersRepo: Repository<Customer>;

    constructor() {
        super();
        this.customersRepo = this.db.getRepository(Customer);
    }

    public async index() {
        const customers = await this.customersRepo.find();
        return customers;
    }

    public async create(req: Request) {
        const newCustomer = new Customer();
        newCustomer.email = req.body.email;
        newCustomer.password = await bcrypt.hash(req.body.password, 10);

        let customer = await this.customersRepo.save(newCustomer);
        if (customer) {
            this.emailService.sendEmail(
                "ario6@ethereal.email",
                customer.email,
                "verify",
                { link: `${process.env.BASE_URL}/customers/verify/` + customer.verificationCode }
            );
        }
    }

    public async login(req: Request) {
        let customer = await this.customersRepo.findOne({
            where: {
                email: req.body.email
            }
        });

        if (customer) {
            const match = await bcrypt.compare(req.body.password, customer.password);
            if (match) {
                if (customer.verified) {
                    req.session.customer = customer.id;
                } else {
                    throw new Error("Customer not verified");
                }
            } else {
                throw new Error("Invalid password");
            }
        } else {
            throw new Error("Customer doesn't exist");
        }
    }

    public async verify(code: string) {
        const customer = await this.customersRepo.findOne({
            where: {
                verificationCode: code
            }
        });

        if (customer) {
            customer.verified = true;
            await this.customersRepo.save(customer);
        } else {
            throw new Error("Invalid verification code");
        }
    }

    public async logout(req: Request) {
        req.session.destroy((err) => {
            if (err) {
                throw new Error("Error while logging out");
            }
        });
    }

    public async resetPasswordInit(req: Request) {

        let customerId = req.session.customer;
        if (customerId) {
            let customer = await this.customersRepo.findOne({
                where: {
                    id: customerId
                }
            });
            if (customer) {
                customer.resetCode = Math.random().toString(36).slice(2);;
                await this.customersRepo.save(customer);
                this.emailService.sendEmail(
                    "ario6@ethereal.email",
                    customer.email,
                    "resetPassword",
                    { link: `${process.env.BASE_URL}/customers/reset-password/` + customer.resetCode }
                );
            } else {
                throw new Error("Customer doesn't exist");
            }
        } else {
            throw new Error("Customer not logged in");
        }

    }

    public async resetPasswordFinish(req: Request) {
        //TODO: Check if reset code hasn't expired
        let customer = await this.customersRepo.findOne({
            where: {
                resetCode: req.params.code
            }
        });

        if (customer) {
            customer.password = await bcrypt.hash(req.body.password, 10);
            await this.customersRepo.save(customer);
        } else {
            throw new Error("Invalid reset code");
        }
    }
}