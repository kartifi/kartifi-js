import { EmailService } from "../api/v1/services/email";

export var emailService;

export default function () {
    emailService = new EmailService();
}
