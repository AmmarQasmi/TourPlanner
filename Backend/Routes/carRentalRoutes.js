import { Router } from "express";
import { createCarRental, deleteCarRental, getAllCarRentals, getRentalByID, updateCarRental } from "../controller/carRentalController.js";
import { validateCars } from "../Middlewares/carRentalValidation.js";
import { authenticateAgent } from "../Middlewares/agentValidation.js";

const carRentalRouter = Router();

carRentalRouter.get('/', getAllCarRentals);
carRentalRouter.post('/', authenticateAgent,createCarRental);

carRentalRouter.param('id', validateCars);

carRentalRouter.get('/:id', getRentalByID);
carRentalRouter.put('/:id', authenticateAgent, updateCarRental);
carRentalRouter.delete('/:id', authenticateAgent, deleteCarRental);

export default carRentalRouter;