import { Router } from "express";
import { login, logout } from "../controller/clientauthController.js";

const clientauthRouter = Router();

clientauthRouter.post('/login', login);
clientauthRouter.post('/logout', logout);

export default clientauthRouter;