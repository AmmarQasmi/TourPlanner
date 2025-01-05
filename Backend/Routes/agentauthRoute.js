import { Router } from "express";
import { login, logout } from "../controller/AgentauthController.js";

const agentAuthRouter = Router();

agentAuthRouter.post('/login', login);
agentAuthRouter.post('/logout', logout);

export default agentAuthRouter;