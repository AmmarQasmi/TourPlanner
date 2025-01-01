import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "errorhandler";
<<<<<<< HEAD
import agentRoute from "./Routes/agentRoute.js";
import clientRouter from "./Routes/clientRoutes.js";
=======
import agentRouter from "./Routes/agentRoute.js";
import bookingRouter from "./Routes/BookingsRoutes.js";
>>>>>>> 24d9e86e60eb6e467ad6f208c8e457fd08cba70d
const app = express();

const PORT = 5000;

//middlewares
app.use(express.json()); //parse json
app.use(morgan("dev"));
app.use(cors());
app.use(errorHandler());

<<<<<<< HEAD

app.use("/api/agents",agentRoute); 
app.use("/api/clients", clientRouter);
=======
app.use("/api/agents",agentRouter); 
app.use("/api/bookings",bookingRouter); 
>>>>>>> 24d9e86e60eb6e467ad6f208c8e457fd08cba70d


app.listen(PORT, () => {
  console.log("Connected to TouristPlanner");
});
