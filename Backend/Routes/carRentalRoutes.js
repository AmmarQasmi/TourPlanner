import { Router } from "express";
import { createCarRental, deleteCarRental, getAllCarRentals, getRentalByID, updateCarRental } from "../controller/carRentalController.js";
import { validateCars } from "../Middlewares/carRentalValidation.js";

const carRentalRouter = Router();

carRentalRouter.get('/', getAllCarRentals);
carRentalRouter.post('/', createCarRental);

carRentalRouter.get('/:id', validateCars, getRentalByID);
carRentalRouter.put('/:id', validateCars, updateCarRental);
carRentalRouter.delete('/:id', validateCars, deleteCarRental);

export default carRentalRouter;