import { BaseService } from "./base";
import { User } from "../models/user";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import { Request } from "express";


export class UsersService extends BaseService {
    usersRepo: Repository<User>;

    constructor() {
        super();
        this.usersRepo = this.db.getRepository(User);
    }

    public async index() {
        const users = await this.usersRepo.find();
        return users;
    }

    public async create(req: Request) {
        const newUser = new User();
        newUser.email = req.body.email;
        newUser.password = await bcrypt.hash(req.body.password, 10);

        let user = await this.usersRepo.save(newUser);
        if (user) {
            this.emailService.sendEmail(
                "ario6@ethereal.email",
                user.email,
                "welcomeUser",
                { link: `${process.env.BASE_URL}/dashboard` }
            );
        }
    }

    public async login(req: Request) {
        let user = await this.usersRepo.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user) {
            const match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                req.session.user = user.id;
            } else {
                throw new Error("Invalid password");
            }
        } else {
            throw new Error("User doesn't exist");
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

        let userId = req.session.user;
        if (userId) {
            let user = await this.usersRepo.findOne({
                where: {
                    id: userId
                }
            });
            if (user) {
                user.resetCode = Math.random().toString(36).slice(2);;
                await this.usersRepo.save(user);
                this.emailService.sendEmail(
                    "ario6@ethereal.email",
                    user.email,
                    "resetPassword",
                    { link: `${process.env.BASE_URL}/users/reset-password/` + user.resetCode }
                );
            } else {
                throw new Error("User doesn't exist");
            }
        } else {
            throw new Error("User not logged in");
        }

    }

    public async resetPasswordFinish(req: Request) {
        //TODO: Check if reset code hasn't expired
        let user = await this.usersRepo.findOne({
            where: {
                resetCode: req.params.code
            }
        });

        if (user) {
            user.password = await bcrypt.hash(req.body.password, 10);
            await this.usersRepo.save(user);
        } else {
            throw new Error("Invalid reset code");
        }
    }
}