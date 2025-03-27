// import mongoose from "mongoose";
// import { platformDb } from "@/src/api/models/databaseModel";

// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

// const nodeSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     required: true,
//     enum: ["edge", "cloud", "gateway", "device"],
//     default: "edge",
//   },
//   location: {
//     type: String,
//   },
//   sensors: {
//     type: [ObjectId],
//     ref: "Sensor",
//     default: [],
//   },
//   L2: {
//     type: [String],
//   },
//   isOnline: {
//     type: Boolean,
//     default: false,
//   },
// });

// const nodeModel = platformDb.model("Node", nodeSchema);

// export default nodeModel;
