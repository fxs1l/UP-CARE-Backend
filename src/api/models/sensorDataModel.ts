/* eslint-disable @typescript-eslint/naming-convention */
import { Payload } from "@/types/Payload";
import QueryOptions from "@/types/QueryOptions";

import { writeApi, queryApi, Point } from "@/src/api/databases/localDatabaseModel";
import { influxBucket } from "@/constants/influxdb";

import log from "@/utils/logging";
import { LogOrigin } from "@/types/Logger";
import careDatabaseApi from "../databases/careDatabaseModel";
import { careDatabaseWorkspaceId } from "../../constants/caredb";
import { AxiosError } from "axios";

const localDatabase = {
  write: async (payload: Payload) => {
    const { type, source, latitude, longitude, local_time, ...sensorData } = payload;
    Object.entries(sensorData).forEach(([sensorKey, value]) => {
      if (sensorKey !== "type") {
        const [sensorModel, parameter] = sensorKey.split("_");

        const point = new Point("sensor_readings")
          .tag("type", type) // TODO: Verify this tag
          .tag("source", source)
          .tag("sensor_model", sensorModel)
          .tag("parameter", parameter)
          .floatField("value", value)
          .timestamp(local_time);

        try {
          writeApi.writePoint(point);
          log.success("Sensor data written to InfluxDB", LogOrigin.INFLUXDB);
        } catch (error) {
          throw new Error("Error writing sensor data: " + error);
        }

      }
    });

    try {
      await writeApi.flush();
    } catch (error) {
      throw new Error("Error flushing data to InfluxDB: " + error);
    }
  },
  query: async (options: QueryOptions) => {

    const { parameter, nodeId, sensorModel, timeRange = "1h", aggregate } = options;

    let fluxQuery = `
    from(bucket: "${influxBucket}")
      |> range(start: -${timeRange})
      |> filter(fn: (r) => r._measurement == "sensor_readings")
  `;

    if (parameter) fluxQuery += `|> filter(fn: (r) => r.parameter == "${parameter}")\n`;
    if (nodeId) fluxQuery += `|> filter(fn: (r) => r.source == "${nodeId}")\n`;
    if (sensorModel) fluxQuery += `|> filter(fn: (r) => r.sensor_model == "${sensorModel}")\n`;

    if (aggregate) {
      fluxQuery += `|> aggregateWindow(every: 10m, fn: ${aggregate}, createEmpty: false)\n`;
    }

    try {
      log.info("Executing Query:\n" + fluxQuery, LogOrigin.INFLUXDB);

      const result = await queryApi.collectRows(fluxQuery);
      log.success("Query Result: \n" + result);
      // return result;
    } catch (error) {
      throw new Error("Error querying data: " + error);
    }
  },
};

const careDatabase = {
  write: async (payload: Payload, tall?: Boolean, urlParams?: Record<string, string>) => {
    const { type, source, latitude, longitude, local_time, ...sensorData } = payload;

    // Convert local_time to format accepted by UP CARE Database
    const date = new Date(Math.floor(parseInt(local_time) * 1e-6)); // convert to milliseconds
    const formattedDate = date.toISOString().replace("T", " ").substring(0, 19);

    // Create a list of data points to form the payload for the CARE Database
    let dataPoints: Record<string, string | number>[] = [];
    Object.entries(sensorData).forEach(([sensorKey, value]) => {
      if (sensorKey !== "type") {
        const point = {
          source: source,
          local_time: formattedDate,
          // latitude: latitude,
          // longitude: longitude,
          [sensorKey]: value,
          // type: type,
        };
        dataPoints.push(point);
      }
    });

    // Define the payload to send to the CARE Database
    const carePayload = {
      topic: `UPCARE/v2/${careDatabaseWorkspaceId?.toUpperCase()}`,
      data: dataPoints,
    };

    // Construct the URL endpoint
    const params = urlParams ? new URLSearchParams(urlParams) : new URLSearchParams();
    if (careDatabaseWorkspaceId) {
      params.append("organization", careDatabaseWorkspaceId);
    } else {
      throw new Error("careDatabaseWorkspaceId is undefined");
    }
    const longEndpoint = `/data/${careDatabaseWorkspaceId}?${params.toString()}`;

    // Send the payload to the CARE Database
    await careDatabaseApi.post(longEndpoint, carePayload).then(response => response.data)
      .catch((error: AxiosError) => {
        const errorMessage = (error.response?.data as { message?: string })?.message || "Unknown error occurred in CARE Database";
        throw new Error(errorMessage);
      });
    log.success("Sensor data written to CARE Database", LogOrigin.CAREDB);
  },

};

export { localDatabase, careDatabase };
