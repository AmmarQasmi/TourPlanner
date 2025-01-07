import { Router } from 'express';
import { createClient, deleteClient, getAllClients, getClientById, login, updateClient, verifyEmail } from '../controller/clientController.js';
import { validateClientId } from '../Middlewares/clientvalidation.js';

const clientRouter = Router();

clientRouter.get('/',getAllClients);
clientRouter.post('/', createClient);
clientRouter.post('/verufy-email', verifyEmail);

// validation middleware
clientRouter.param("clientId",validateClientId);

clientRouter.get("/:clientId", getClientById);
clientRouter.put("/:clientId", updateClient);
clientRouter.delete("/:clientId",deleteClient);

export default clientRouter;