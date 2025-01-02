import { Router } from "express";
import { createDestination, deleteDestination, getAllDestinations, getDestinationById, updateDestination } from "../controller/destinationController.js";
import { validateDestinationId } from "../Middlewares/destinationMiddleware.js";

const destinationRouter = Router();

destinationRouter.get('/', getAllDestinations);
destinationRouter.post('/', createDestination);

destinationRouter.param('destId', validateDestinationId);

destinationRouter.get('/:destId', getDestinationById);
destinationRouter.put('/:destId', updateDestination);
destinationRouter.delete('/:destId', deleteDestination);

export default destinationRouter;