import { Router } from "express";
import { validateBooking } from "../Middlewares/bookingValidation.js";
import { createBooking, deleteBooking, getBooking, getBookingsbyID, updateBooking } from "../controller/bookingController.js";
import { authenticateClient } from '../Middlewares/clientvalidation.js';
import { authenticateUser } from "../Middlewares/dualValidation.js";

const bookingRouter = Router();

bookingRouter.post("/create", authenticateClient ,createBooking);
bookingRouter.get("/get", authenticateUser,getBooking);

bookingRouter.param("id", validateBooking);

bookingRouter.get("/get/:id" ,getBookingsbyID);
bookingRouter.put("/update/:id", authenticateUser,updateBooking);
bookingRouter.delete("/delete/:id", authenticateUser,deleteBooking);

export default bookingRouter;