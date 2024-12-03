import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import MessageResponse from "@/types/MessageResponse";
import { apiBaseUrl } from "@/constants/url";

import { notFound, errorHandler } from "@/api/middlewares/errorMiddleware";
import nodeRoutes from "@/api/routes/nodeRoutes";
import sensorRoutes from "@/api/routes/sensorRoutes";
import sensorDataRoutes from "@/api/routes/sensorDataRoutes";


require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());


// Routes
app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "Welcome to UP CARE Platform API",
    // TODO: write documentation for the API
  });
});
app.use(apiBaseUrl, nodeRoutes);
app.use(apiBaseUrl, sensorRoutes);
app.use(apiBaseUrl, sensorDataRoutes);

// Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
