import { DataSource } from "typeorm";
import { db } from "../../../loaders/database";
import { EmailService } from "./email";
import { emailService } from "../../../loaders/email";

export abstract class BaseService {
    protected db: DataSource;
    protected emailService: EmailService;

    constructor() {
        this.db = db;
        this.emailService = emailService;
    }
}