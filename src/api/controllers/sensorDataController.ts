import { localDatabase, careDatabase } from "@/api/models/sensorDataModel";
import log from "@/utils/logging";
import { Payload } from "@/types/Payload";

export const createSensorData = async (req: any, res: any) => {
  try {
    const body = JSON.parse(req.payload.toString()) as Payload;
    log.info("Sensor data received:", body);

    // Execute both write operations concurrently
    const results = await Promise.allSettled([
      localDatabase.write(body),
      careDatabase.write(body),
    ]);

    // Map the results to their respective database names
    const databaseNames = ["INFLUXDB", "CAREDB"];
    const successfulDatabases = results
      .map((result, index) => (result.status === "fulfilled" ? databaseNames[index] : null))
      .filter(Boolean); // Filter out null values

    const successfulCount = successfulDatabases.length;

    if (successfulCount > 0) {
      const successMessage = `Data saved successfully in ${successfulCount}/${databaseNames.length} database(s): ${successfulDatabases.join(", ")}`;
      log.success(successMessage);
      res.code = "2.01";
      res.end(successMessage);
    } else {
      log.error("Failed to save in both databases!");
      res.code = "5.00";
      res.end("Failed to save in both databases!");

    }
  } catch (error: any) {
    res.code = "5.00";
    log.error(`Error saving data: ${error.message}`, error.origin);
    res.end(error.message);
  }
};

export const getAllSensorData = async (req: any, res: any) => {
  try {
    res.end(JSON.stringify(req.body));
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const getLatestSensorData = async (req: any, res: any) => {
  try {
    res.code = "2.00";
    res.end(JSON.stringify(req.body));
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const getDataBySensorId = async (req: any, res: any) => {
  try {
    const { sensorId } = req.params;
    res.end(req.body);

  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const getLatestDataBySensorId = async (req: any, res: any) => {
  try {
    const { sensorId } = req.params;
    res.end(req.body);
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const updateSensorData = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    res.code = "2.00";
    res.end(req.body);
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const deleteSensorData = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    res.end(req.body);
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};
