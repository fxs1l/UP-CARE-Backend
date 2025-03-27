import { writeSensorData, queryData } from "@/api/models/sensorDataModel";
import log from "@/utils/logging";
import Payload from "@/types/Payload";

export const createSensorData = async (req: any, res: any) => {
  try {
    const body = JSON.parse(req.payload.toString()) as Payload;
    log.info(`Sensor data received: \n${JSON.stringify(body)}`);

    await writeSensorData(body);
    log.success("Data point saved successfully!");
    res.code = "2.01";
    res.end("Data saved successfully");


  } catch (error: any) {
    res.code = "5.00";
    log.error(`Error saving data: ${error.message}`);
    res.end(error.message);
  }
};

export const getAllSensorData = async (req: any, res: any) => {
  try {
    res.end(JSON.stringify(req.body));
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const getLatestSensorData = async (req: any, res: any) => {
  try {
    res.code = "2.00";
    res.end(JSON.stringify(req.body));
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const getDataBySensorId = async (req: any, res: any) => {
  try {
    const { sensorId } = req.params;
    res.end(req.body);

  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const getLatestDataBySensorId = async (req: any, res: any) => {
  try {
    const { sensorId } = req.params;
    res.end(req.body);
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const updateSensorData = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    res.code = "2.00";
    res.end(req.body);
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const deleteSensorData = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    res.end(req.body);
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};
