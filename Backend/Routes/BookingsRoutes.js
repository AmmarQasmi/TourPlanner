import { Router } from "express";
import { validateBooking } from "../Middlewares/bookingValidation.js";
import { createBooking, deleteBooking, getBooking, getBookingsbyID, updateBooking } from "../controller/bookingController.js";

const bookingRouter = Router();

bookingRouter.post("/create", createBooking);
bookingRouter.get("/get", getBooking);

bookingRouter.param("id", validateBooking);

bookingRouter.get("/get/:id", getBookingsbyID);
bookingRouter.put("/update/:id", updateBooking);
bookingRouter.delete("/delete/:id", deleteBooking);

export default bookingRouter;