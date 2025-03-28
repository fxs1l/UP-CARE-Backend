import * as coap from "coap";
import { apiBaseUrl, sensorDataEndpoint, statusEndpoint } from "@/constants/url";
import {
  createSensorData,
  getAllSensorData,
} from "@/api/controllers/sensorDataController";
import log from "@/utils/logging";

const server = coap.createServer();

// CoAP handlers
server.on("request", (req, res) => {
  const { method, url } = req;
  log.info(`Received ${method} request on ${url}`);

  // Handle /api/sensor-data
  if (url.startsWith(apiBaseUrl + sensorDataEndpoint)) {
    // Verb: POST
    if (method === "POST") {
      log.info("Processing POST request on /api/sensor-data");
      return createSensorData(req, res);
    }
    // Verb: GET
    if (method === "GET") {
      log.info("Processing GET request on /api/sensor-data");
      return getAllSensorData(req, res);
    }
    // Verb: PUT or PATCH
    if (method === "PUT" || method === "PATCH") {
      log.info("Update sensor data not yet implemented");
    }
    // Verb: DELETE
    if (method === "DELETE") {
      log.info("Delete sensor data not yet implemented");
    }
  }

  // Handle /api/status
  if (url === apiBaseUrl + statusEndpoint) {
    // Verb: GET
    if (method === "GET") {
      log.info("Processing GET request on /api/status");
      const currentTime = new Date().getTime() * 1e6;
      res.end(currentTime);
    }
  }

  // Default: Resource not found
  log.error(`Resource not found: ${url}`);
  res.code = "4.04"; // Not Found
  res.end("Not Found");
});

export default server;
