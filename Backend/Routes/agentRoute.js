import { Router } from "express";
import { createAgent, deleteAgent, getAgents, getAgentsByID, updateAgent } from "../controller/agentController.js";
import { validateAgent } from "../Middlewares/agentValidation.js";

const agentRouter = Router();

agentRouter.post("/create", createAgent);
// agentRouter.post("/login", login);
agentRouter.get("/get", getAgents);

agentRouter.param('id', validateAgent);

agentRouter.get("/get/:id", getAgentsByID);
agentRouter.put("/update/:id", updateAgent);
agentRouter.delete("/delete/:id", deleteAgent);

export default agentRouter;
