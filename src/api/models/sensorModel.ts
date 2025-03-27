// import mongoose from "mongoose";
// import { platformDb } from "@/src/api/models/databaseModel";

// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

// const sensorSchema = new Schema({
//   nodeId: {
//     type: ObjectId,
//     ref: "Node",
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: [String],
//     required: true,
//     enum: ["gas", "pm", "camera"],
//   },
//   gasType: {
//     type: [String],
//     enum: ["CO", "CO2", "NOx", "O3", "SO2"],
//     required: function (this: any) {
//       return this.type === "gas";
//     },
//   },
//   pmSize: {
//     type: [String],
//     enum: ["PM2.5", "PM10"],
//     required: function (this: any) {
//       return this.type === "pm";
//     },
//   },
//   cameraCapabilities: {
//     vehicleCount: {
//       type: Boolean, default: false, required: function (this: any) {
//         return this.type === "camera";
//       },
//     },
//     vehicleTracking: {
//       type: Boolean, default: false, required: function (this: any) {
//         return this.type === "camera";
//       },
//     },

//   },
// });

// const sensorModel = platformDb.model("Sensor", sensorSchema);

// export default sensorModel;
