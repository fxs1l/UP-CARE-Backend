import mongoose from "mongoose";
require("dotenv").config();

const mongoURI = process.env.MONGO_URI as string;
const platformURL = mongoURI + "platformDB";
const sensorDataURL = mongoURI + "sensorDataDB";

const databaseOptions: mongoose.ConnectOptions = {
  retryWrites: true,
  w: "majority",
  appName: "Traffic-Intersection",
};

const platformDb = mongoose.createConnection(platformURL, databaseOptions);
const sensorDataDb = mongoose.createConnection(sensorDataURL, databaseOptions);

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log("Connected to default MongoDB instance");
//   } catch (error) {
//     console.error("Error connecting to default MongoDB instance: ", error);
//   }
// };

// export default connectToDatabase;

export { platformDb, sensorDataDb };
