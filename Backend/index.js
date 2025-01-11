import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "errorhandler";
import cookieParser from "cookie-parser";
import agentRoute from "./Routes/agentRoute.js";
import clientRouter from "./Routes/clientRoutes.js";
import bookingRouter from "./Routes/BookingsRoutes.js";
import transactionRouter from "./Routes/transactionRoutes.js";
import destinationRouter from "./Routes/destinationRoutes.js";
import carRentalRouter from "./Routes/carRentalRoutes.js";
import hotelRouter from "./Routes/hotels.js";
import agentAuthRouter from "./Routes/agentauthRoute.js";
import clientauthRouter from "./Routes/clientauthRoute.js";
import contactRouter from "./Routes/contact.js";
const app = express();

const PORT = 5000;

//middlewares
app.use(express.json()); //parse json
app.use(express.urlencoded({ extended: true })); // for encoded forms
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
})); // allow resource sharing
app.use(errorHandler());

// all routes go here
app.use('/api/auth/agents', agentAuthRouter);
app.use('/api/auth/clients', clientauthRouter);
app.use("/api/agents",agentRoute); 
app.use("/api/clients", clientRouter);
app.use("/api/bookings",bookingRouter); 
app.use("/api/transactions", transactionRouter);
app.use('/api/destinations', destinationRouter);
app.use('/api/cars', carRentalRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/contact', contactRouter);

app.listen(PORT, () => {
  console.log("Connected to TouristPlanner");
});
