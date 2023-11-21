import Email from "email-templates";
import nodemailer, { Transporter } from "nodemailer";
import { cwd } from "process";

export class EmailService {
    protected email: Email;

    constructor() {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        this.email = new Email({
            send: process.env.NODE_ENV === 'production',
            transport: transporter,
            views: {
                root: cwd() + '/src/views/emails',
            },
        });
    }

    public async sendEmail(from: string, to: string, template: string, data: any) {
        // this.transporter.sendMail({ from, to, subject, html: 'Great' });
        this.email.send({
            template: template,
            message: {
                from: from,
                to: to,
            },
            locals: {
                link: data.link,
            }
        });


    }
}