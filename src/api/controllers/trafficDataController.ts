import { localDatabase } from "@/api/models/trafficDataModel";
import log from "@/utils/logging";
import { TrafficCountPayload, TrafficFlowPayload } from "@/types/Payload";
import { LogOrigin } from "../../interfaces/Logging";

export const createTrafficCountData = async (req: any, res: any) => {
  try {
    const body = JSON.parse(req.payload.toString()) as TrafficCountPayload;
    log.info("Traffic count data received:", body);

    // Execute both write operations concurrently
    const results = await Promise.allSettled([
      localDatabase.writeTrafficCount(body),
      // careDatabase.write(body),
    ]);


    // Map the results to their respective database names
    const databaseNames = [
      LogOrigin.INFLUXDB,
      // LogOrigin.CAREDB
    ];
    const successfulDatabases = results
      .map((result, index) => (result.status === "fulfilled" ? databaseNames[index] : null))
      .filter(Boolean); // Filter out null values

    const successfulCount = successfulDatabases.length;

    results.forEach((result, index) => {
      if (result.status === "rejected") {
        log.error(`Error saving data to ${databaseNames[index]}:`, result.reason.origin ?? "", result.reason.message);
      }
    });

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

export const createTrafficFlowData = async (req: any, res: any) => {
  try {
    const body = JSON.parse(req.payload.toString()) as TrafficFlowPayload;
    log.info("Traffic flow data received:", body);

    // Execute both write operations concurrently
    const results = await Promise.allSettled([
      localDatabase.writeTrafficFlow(body),
      // careDatabase.write(body),
    ]);


    // Map the results to their respective database names
    const databaseNames = [
      LogOrigin.INFLUXDB,
      // LogOrigin.CAREDB
    ];
    const successfulDatabases = results
      .map((result, index) => (result.status === "fulfilled" ? databaseNames[index] : null))
      .filter(Boolean); // Filter out null values

    const successfulCount = successfulDatabases.length;

    results.forEach((result, index) => {
      if (result.status === "rejected") {
        log.error(`Error saving data to ${databaseNames[index]}:`, result.reason.origin ?? "", result.reason.message);
      }
    });

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
