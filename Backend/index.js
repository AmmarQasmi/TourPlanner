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

<<<<<<< HEAD:index.js
=======
// all routes go here
>>>>>>> 7b3495e83d74f68975c561a1f7e9e07168273404:Backend/index.js

app.use("/api/agents",agentRoute); 


app.listen(PORT, () => {
  console.log("Connected to TouristPlanner");
});
