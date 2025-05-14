/* eslint-disable @typescript-eslint/naming-convention */
import { TrafficCountPayload, TrafficFlowPayload } from "@/types/Payload";
import QueryOptions from "@/types/QueryOptions";

import { writeApi, queryApi, Point } from "@/src/api/databases/localDatabaseModel";

import log from "@/utils/logging";
import { LogOrigin, CareDBError, InfluxDBError } from "@/src/interfaces/Logging";

const localDatabase = {
  writeTrafficCount: async (payload: TrafficCountPayload) => {
    const { source, local_time, count } = payload;
    const timestamp = new Date(local_time);

    const point = new Point("traffic_readings")
      .tag("source", source)
      .timestamp(timestamp);

    Object.entries(count).forEach(([vehicleType, value]) => {
      if (value !== undefined) {
        point.intField(vehicleType, value);
      }
    });

    try {
      writeApi.writePoint(point);
    } catch (error) {
      throw new InfluxDBError("Error creating point: " + error);
    }

    try {
      await writeApi.flush();
      log.success("Traffic count data written to InfluxDB", LogOrigin.INFLUXDB);
    } catch (error) {
      throw new InfluxDBError("Error flushing data to InfluxDB: " + error);
    }
  },
  writeTrafficFlow: async (payload: TrafficFlowPayload) => {
    const { source, local_time, flow } = payload;

    const timestamp = new Date(local_time);

    const point = new Point("traffic_readings")
      .tag("source", source)
      .timestamp(timestamp)
      .tag("vehicle_type", flow.vehicle_type)
      .tag("direction", flow.direction)
      .stringField("vehicle_id", flow.vehicle_id.toString())
      .stringField("status", flow.status);

    try {
      writeApi.writePoint(point);
    } catch (error) {
      throw new InfluxDBError("Error creating point: " + error);
    }
    try {

      log.success("Traffic flow data written to InfluxDB", LogOrigin.INFLUXDB);
    } catch (error) {
      throw new InfluxDBError("Error flushing data to InfluxDB: " + error);
    }
  },
};

export { localDatabase };
