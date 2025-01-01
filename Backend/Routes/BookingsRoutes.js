import { Router } from "express";
import { validateBooking } from "../Middlewares/bookingValidation.js";
import { createBooking, deleteBooking, getBooking, getBookingsbyID, updateBooking } from "../controller/bookingController.js";

const bookingRouter = Router();

bookingRouter.post("/create", createBooking);
bookingRouter.get("/get", getBooking);
bookingRouter.get("/get/:id", validateBooking, getBookingsbyID);
bookingRouter.put("/update/:id", validateBooking, updateBooking);
bookingRouter.delete("/delete/:id", validateBooking, deleteBooking);

export default bookingRouter;