import { Router } from "express";
import { createDestination, deleteDestination, getAllDestinations, getDestinationById, updateDestination } from "../controller/destinationController.js";
import { validateDestinationId } from "../Middlewares/destinationMiddleware.js";
import { authenticateAgent } from "../Middlewares/agentValidation.js";

const destinationRouter = Router();

destinationRouter.get('/', getAllDestinations);
destinationRouter.post('/', authenticateAgent, createDestination);

destinationRouter.param('destId', validateDestinationId);

destinationRouter.get('/:destId', getDestinationById);
destinationRouter.put('/:destId', authenticateAgent, updateDestination);
destinationRouter.delete('/:destId', authenticateAgent, deleteDestination);

export default destinationRouter;