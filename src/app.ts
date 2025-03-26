import * as coap from "coap";
import {
  createSensor,
  deleteSensor,
  getSensorById,
  getSensors,
  getSensorsByNodeId,
  updateSensor,
} from "@/api/controllers/sensorController";
import { apiBaseUrl, sensorEndpoint } from "@/constants/url";
import {
  createSensorData,
  deleteSensorData,
  getAllSensorData,
  getDataBySensorId,
  getLatestDataBySensorId,
  getLatestSensorData,
  updateSensorData,
} from "@/api/controllers/sensorDataController";
import { sensorDataEndpoint } from "@/constants/url";

const server = coap.createServer();

// Define the sensor endpoint


// CoAP handlers
server.on("request", (req, res) => {
  const { method, url } = req;
  console.log(`Received ${method} request on ${url}`);
  //console.log(url === "/" + apiBaseUrl + sensorDataEndpoint);
  if (url === apiBaseUrl + sensorEndpoint) {
    // Route: POST /sensors
    if (method === "POST" && url === sensorEndpoint) {
      return createSensor(req, res);
    }

    // Route: GET /sensors
    if (method === "GET" && url === sensorEndpoint) {
      return getSensors(req, res);
    }

    // Route: GET /sensors/:id
    if (method === "GET" && url.startsWith(`${sensorEndpoint}/`)) {
      const id = url.split("/")[2];
      return getSensorById(req, res);
    }

    // Route: GET /sensors/node/:nodeId
    if (method === "GET" && url.startsWith(`${sensorEndpoint}/node/`)) {
      const nodeId = url.split("/")[3];
      return getSensorsByNodeId(req, res);
    }

    // Route: PUT or PATCH /sensors/:id
    if ((method === "PUT" || method === "PATCH") && url.startsWith(`${sensorEndpoint}/`)) {
      const id = url.split("/")[2];
      return updateSensor(req, res);
    }

    // Route: DELETE /sensors/:id
    if (method === "DELETE" && url.startsWith(`${sensorEndpoint}/`)) {
      const id = url.split("/")[2];
      return deleteSensor(req, res);
    }
  } else if (url === "/" + apiBaseUrl + sensorDataEndpoint || apiBaseUrl + sensorDataEndpoint) {
    // Route: POST /sensor-data
    if (method === "POST") {
	console.log("Processing POST request");
      return createSensorData(req, res);
    } else if (method === "GET") {
    	console.log("Processing GET request");
	return getAllSensorData(req, res);
    }
  }


  // Default: Resource not found
  res.code = "4.04"; // Not Found
  res.end("Not Found");
});



export default server;
