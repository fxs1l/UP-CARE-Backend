import { Request, Response } from "express";

import sensorDataModel from "@/api/models/sensorDataModel";
import sensorModel from "@/api/models/sensorModel";

export const createSensorData = async (req: Request, res: Response) => {
  try {
    const { sensorId } = req.body;
    const sensor = await sensorModel.findById(sensorId);
    if (!sensor) {
      res.status(404).json({ message: "Sensor not found" });
      return;
    }
    const sensorData = await sensorDataModel.create(req.body);
    await sensorData.save();
    res.status(201).json(sensorData);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSensorData = async (req: Request, res: Response) => {
  try {
    const sensorData = await sensorDataModel.find();
    res.status(200).json(sensorData);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLatestSensorData = async (req: Request, res: Response) => {
  try {
    const sensorData = await sensorDataModel.findOne().sort({ timestamp: -1 });
    res.status(200).json(sensorData);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDataBySensorId = async (req: Request, res: Response) => {
  try {
    const { sensorId } = req.params;
    const sensor = await sensorModel.findById(sensorId);
    if (!sensor) {
      res.status(404).json({ message: "Sensor not found" });
      return;
    }
    const sensorData = await sensorDataModel.find({ sensorId }).sort({ timestamp: -1 });
    res.status(200).json(sensorData);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLatestDataBySensorId = async (req: Request, res: Response) => {
  try {
    const { sensorId } = req.params;
    const sensor = await sensorModel.findById(sensorId);
    if (!sensor) {
      res.status(404).json({ message: "Sensor not found" });
      return;
    }
    const sensorData = await sensorDataModel.findOne({ sensorId }).sort({ timestamp: -1 });
    res.status(200).json(sensorData);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSensorData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sensorData = await sensorDataModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    if (!sensorData) {
      res.status(404).json({ message: "Sensor data instance not found" });
      return;
    }
    await sensorData.save();
    res.status(200).json(sensorData);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSensorData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sensorData = await sensorDataModel.findByIdAndDelete(id);
    if (!sensorData) {
      res.status(404).json({ message: "Sensor data instance not found" });
      return;
    }
    res.status(200).json({ sensorData, message: "Sensor data instance deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
