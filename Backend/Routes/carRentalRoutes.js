import { Router } from "express";
import { createCarRental, deleteCarRental, getAllCarRentals, getRentalByID, updateCarRental } from "../controller/carRentalController.js";
import { validateRentalId } from "../Middlewares/carRentalValidation.js";

const carRentalRouter = Router();

carRentalRouter.get('/', getAllCarRentals);
carRentalRouter.post('/', createCarRental);

carRentalRouter.param('RentId', validateRentalId);

carRentalRouter.get('/:RentId', getRentalByID);
carRentalRouter.put('/:RentId', updateCarRental);
carRentalRouter.delete('/:RentId', deleteCarRental);

export default carRentalRouter;