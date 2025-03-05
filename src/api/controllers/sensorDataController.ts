import sensorDataModel from "@/api/models/sensorDataModel";
import sensorModel from "@/api/models/sensorModel";

export const createSensorData = async (req: any, res: any) => {
  try {
    const body = JSON.parse(req.payload.toString());
    const { sensorId } = body;
    const sensor = await sensorModel.findById(sensorId);
    if (!sensor) {
      console.log("Sensor not found");
      res.code = "4.04";
      res.end("Sensor not found");

      return;
    }
    const sensorData = await sensorDataModel.create(body);
    await sensorData.save();
    res.code = "2.01";
    res.end("Created");

  } catch (error: any) {
    res.code = "5.00";
    res.end(error.message);
  }
};

export const getAllSensorData = async (req: any, res: any) => {
  try {
    const sensorData = await sensorDataModel.find();
    res.code = "2.00";
    res.end(JSON.stringify(sensorData));
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const getLatestSensorData = async (req: any, res: any) => {
  try {
    const sensorData = await sensorDataModel.findOne().sort({ timestamp: -1 });
    res.code = "2.00";
    res.end(JSON.stringify(sensorData));
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const getDataBySensorId = async (req: any, res: any) => {
  try {
    const { sensorId } = req.params;
    const sensor = await sensorModel.findById(sensorId);
    if (!sensor) {
      res.code = "4.04";
      res.end({ message: "Sensor not found" });
      return;
    }
    const sensorData = await sensorDataModel.find({ sensorId }).sort({ timestamp: -1 });
    res.code = "2.00";
    res.end({ sensorData });

  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const getLatestDataBySensorId = async (req: any, res: any) => {
  try {
    const { sensorId } = req.params;
    const sensor = await sensorModel.findById(sensorId);
    if (!sensor) {
      res.code = "4.04";
      res.end({ message: "Sensor not found" });
      return;
    }
    const sensorData = await sensorDataModel.findOne({ sensorId }).sort({ timestamp: -1 });
    res.code = "2.00";
    res.end(sensorData);
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const updateSensorData = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const sensorData = await sensorDataModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    if (!sensorData) {
      res.code = "4.04";
      res.end({ message: "Sensor data instance not found" });
      return;
    }
    await sensorData.save();
    res.code = "2.00";
    res.end(sensorData);
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};

export const deleteSensorData = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const sensorData = await sensorDataModel.findByIdAndDelete(id);
    if (!sensorData) {
      res.code = "4.04";
      res.end({ message: "Sensor data instance not found" });
      return;
    }
    res.code = "2.00";
    res.end({ sensorData, message: "Sensor data instance deleted" });
  } catch (error: any) {
    res.code = "5.00";
    res.end({ message: error.message });
  }
};
