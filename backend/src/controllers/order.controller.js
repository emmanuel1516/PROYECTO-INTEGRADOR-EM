import ErrorService from "../services/error.service.js";
import OrderService from "../services/order.service.js";
import { validateSendOrder } from "../validators/order.validator.js";

export default class OrderController {
    #orderService = new OrderService();

    async sendOrder(req, res) {
        try {
            const payload = validateSendOrder(req.body);
            await this.#orderService.sendOrder(payload);
            res.status(204).send();
        } catch (e) {
            const handled = ErrorService.handleError(e);
            res.status(handled.code).json({ status: "error", message: handled.message });
        }
    }
}