/* eslint-disable @typescript-eslint/naming-convention */
require("dotenv").config();

import { InfluxDB, Point } from "@influxdata/influxdb-client";
import { Agent } from "http";

import { influxUrl, influxOrg, influxBucket, influxToken } from "@/constants/influxdb";


const keepAliveAgent = new Agent({
  keepAlive: true, // reuse existing connections
  keepAliveMsecs: 20 * 1000, // 20 seconds keep alive
});
process.on("exit", () => keepAliveAgent.destroy());


const influxDB = new InfluxDB(
  {
    url: influxUrl,
    token: influxToken,
    transportOptions: { agent: keepAliveAgent },
  });

const writeApi = influxDB.getWriteApi(influxOrg, influxBucket);
const queryApi = influxDB.getQueryApi(influxOrg);

export { writeApi, queryApi, Point };
