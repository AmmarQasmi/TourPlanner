import { Router } from "express";
import { validateHotel } from "../Middlewares/hotelValidation.js";
import { createHotel, deleteHotel, getHotel, getHotelByID, updateHotel } from "../controller/hotelController.js";


const hotelRouter = Router();

hotelRouter.post("/create", createHotel);
hotelRouter.get("/get", getHotel);
hotelRouter.get("/get/:id", validateHotel, getHotelByID);
hotelRouter.put("/update/:id", validateHotel, updateHotel);
hotelRouter.delete("/delete/:id", validateHotel, deleteHotel);

export default hotelRouter;