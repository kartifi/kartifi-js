import { ShippoService } from "../services/shippo";
import { ShippoController } from "../controllers/shippo";
import { ShippoRouter } from "../routes/shippo";



export function setUpRoutes() {
    let service = new ShippoService();
    let controller = new ShippoController(service);
    let router = new ShippoRouter(controller);

    return router;
}