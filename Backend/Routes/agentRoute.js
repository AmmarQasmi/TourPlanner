import { Router } from "express";
import { createAgent, deleteAgent, getAgents, getAgentsByID, login, updateAgent } from "../controller/agentController.js";
import { validateAgent } from "../Middlewares/agentValidation.js";

const agentRouter = Router();

agentRouter.post("/create", createAgent);
agentRouter.post("/login", login);
agentRouter.get("/get", getAgents);
agentRouter.get("/get/:id", validateAgent, getAgentsByID);
agentRouter.put("/update/:id", validateAgent, updateAgent);
agentRouter.delete("/delete/:id", validateAgent, deleteAgent);

export default agentRouter;
