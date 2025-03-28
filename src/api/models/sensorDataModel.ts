/* eslint-disable @typescript-eslint/naming-convention */
import Payload from "@/types/Payload";
import QueryOptions from "@/types/QueryOptions";

import { writeApi, queryApi, Point } from "@/src/api/models/databaseModel";
import { influxBucket } from "@/constants/influxdb";

import log from "@/utils/logging";
import { LogOrigin } from "@/types/Logger";

async function writeSensorData(dataPacket: Payload) {
  const { type, source, latitude, longitude, local_time, ...sensorData } = dataPacket;

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
}

async function queryData(options: QueryOptions): Promise<void> {
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
}

// async function checkNodeExists(nodeId: string): Promise<boolean> {
//   const fluxQuery = `
//     from(bucket: "${influxBucket}")
//       |> range(start: -30d) // Check data within the last 30 days
//       |> filter(fn: (r) => r._measurement == "sensor_readings")
//       |> filter(fn: (r) => r.node_id == "${nodeId}")
//       |> limit(n: 1) // Only fetch one record
//   `;

//   try {
//     const result = await queryApi.collectRows(fluxQuery);
//     console.log(`Node ${nodeId} exists:`, result.length > 0);
//     return result.length > 0;
//   } catch (error) {
//     console.error("Error checking node existence:", error);
//     return false;
//   }
// }

export { writeSensorData, queryData };
