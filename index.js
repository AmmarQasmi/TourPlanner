import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "errorhandler";
import agentRoute from "./Routes/agentRoute.js";
const app = express();

const PORT = 5000;

//middlewares
app.use(express.json()); //parse json
app.use(morgan("dev"));
app.use(cors());
app.use(errorHandler());


app.use("/api/agents",agentRoute); 


app.listen(PORT, () => {
  console.log("Connected to TouristPlanner");
});
