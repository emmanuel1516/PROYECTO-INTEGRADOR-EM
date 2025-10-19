// src/routes/order.router.js
import { Router } from "express";
import OrderController from "../controllers/order.controller.js";

const router = Router();
const orderController = new OrderController();

router.post("/send-mail", orderController.sendOrder.bind(orderController));

export default router;