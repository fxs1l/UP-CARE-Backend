/* eslint-disable @typescript-eslint/naming-convention */
import { TrafficPayload } from "@/types/Payload";
import QueryOptions from "@/types/QueryOptions";

import { writeApi, queryApi, Point } from "@/src/api/databases/localDatabaseModel";

import log from "@/utils/logging";
import { LogOrigin, CareDBError, InfluxDBError } from "@/src/interfaces/Logging";

const localDatabase = {
  write: async (payload: TrafficPayload) => {
    const { source, local_time, count } = payload;
    // const datetime = new Date();

    const point = new Point("traffic_readings")
      .tag("source", source)
      .timestamp(local_time);

    Object.entries(count).forEach(([vehicleType, value]) => {
      if (value !== undefined) {
        console.log(vehicleType)
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
      log.success("Traffic data written to InfluxDB", LogOrigin.INFLUXDB);
    } catch (error) {
      throw new InfluxDBError("Error flushing data to InfluxDB: " + error);
    }
  },
  query: async (options: QueryOptions) => {

    //   const { parameter, nodeId, sensorModel, timeRange = "1h", aggregate } = options;

    //   let fluxQuery = `
    //   from(bucket: "${influxBucket}")
    //     |> range(start: -${timeRange})
    //     |> filter(fn: (r) => r._measurement == "sensor_readings")
    // `;

    //   if (parameter) fluxQuery += `|> filter(fn: (r) => r.parameter == "${parameter}")\n`;
    //   if (nodeId) fluxQuery += `|> filter(fn: (r) => r.source == "${nodeId}")\n`;
    //   if (sensorModel) fluxQuery += `|> filter(fn: (r) => r.sensor_model == "${sensorModel}")\n`;

    //   if (aggregate) {
    //     fluxQuery += `|> aggregateWindow(every: 10m, fn: ${aggregate}, createEmpty: false)\n`;
    //   }

    //   try {
    //     log.info("Executing Query:", fluxQuery, LogOrigin.INFLUXDB);

    //     const result = await queryApi.collectRows(fluxQuery);
    //     log.success("Query Result:", result);
    //   } catch (error) {
    //     throw new InfluxDBError("Error querying data: " + error);
    //   }
  },
};

export { localDatabase };
