import { Router } from "express";
import InquiryController from "../controllers/inquiry.controller.js";

const router = Router();
const inquiryController = new InquiryController();

router.post("/send-mail", inquiryController.sendInquiry.bind(inquiryController));

export default router;