import { Router } from "express";
import { validateHotel } from "../Middlewares/hotelValidation.js";
import { createHotel, deleteHotel, getHotel, getHotelByID, updateHotel } from "../controller/hotelController.js";
import { authenticateAgent } from "../Middlewares/agentValidation.js";


const hotelRouter = Router();

hotelRouter.post("/create", createHotel);
hotelRouter.get("/get",getHotel);

hotelRouter.param('id', validateHotel);

hotelRouter.get("/get/:id", authenticateAgent, getHotelByID);
hotelRouter.put("/update/:id", authenticateAgent, updateHotel);
hotelRouter.delete("/delete/:id", authenticateAgent, deleteHotel);

export default hotelRouter;