import mongoose from "mongoose";
import { sensorDataDb } from "@/src/api/models/databaseModel";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const sensorDataSchema = new Schema(
  {
    sensorId: {
      type: ObjectId,
      ref: "Sensor",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
    data: {
      gasReading: { type: Number },
      pmReading: { type: Number },
      vehicleCount: { type: Number },
      vehicleTracking: { type: Object },
    },
  },
  { timestamps: true },
);

const sensorDataModel = sensorDataDb.model("SensorData", sensorDataSchema);
export default sensorDataModel;
