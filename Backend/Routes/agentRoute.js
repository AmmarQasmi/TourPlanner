import { Router } from "express";
const router = Router();
import { createAgent, deleteAgent, getAgents, updateAgent} from "../controller/agentController.js";
import { validateAgent } from "../Middlewares/agentValidation.js";

router.post("/create", validateAgent, createAgent);
router.get("/get", getAgents);
router.put("/update/:id", validateAgent, updateAgent);
router.delete("/delete/:id", deleteAgent);

export default router;
