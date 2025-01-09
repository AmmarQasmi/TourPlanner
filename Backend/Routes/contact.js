import { Router } from "express";
import { sendNotification } from "../controller/contactController.js";

const contactRouter = Router();

contactRouter.post('/notify', sendNotification);

export default contactRouter;