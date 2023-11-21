import { StripeService } from "../services/payment";
import { StripePaymentsController } from "../controllers/payment";
import { StripePaymentRouter } from "../routes/payment";



export function setUpRoutes() {
    let service = new StripeService();
    let controller = new StripePaymentsController(service);
    let router = new StripePaymentRouter(controller);
    // let toReturn = new StripePaymentRouter(new StripePaymentsController(new StripeService()));
    // return toReturn;
    return router;
}