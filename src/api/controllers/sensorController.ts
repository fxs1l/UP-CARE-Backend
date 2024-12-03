import { Request, Response } from "express";

import sensorModel from "@/api/models/sensorModel";
import nodeModel from "@/api/models/nodeModel";

export const createSensor = async (req: Request, res: Response) => {
  try {
    const { name, nodeId } = req.body;

    // const sensorExists = await sensorModel.exists({ name });
    // if (sensorExists) {
    //   res.status(400).json({ message: "Sensor already exists" });
    //   return;
    // }

    const node = await nodeModel.findById(nodeId);
    if (!node) {
      res.status(404).json({ message: "Node not found" });
      return;
    }

    const sensor = await sensorModel.create(req.body);
    if (node.sensors.includes(sensor._id)) {
      res.status(400).json({ message: "Sensor already exists in the node" });
      return;
    }

    node.sensors.push(sensor._id);
    await sensor.save();
    await node.save();
    res.status(201).json(sensor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSensors = async (req: Request, res: Response) => {
  try {
    const sensors = await sensorModel.find();
    res.status(200).json(sensors);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSensorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sensor = await sensorModel.findById(id);
    if (!sensor) {
      res.status(404).json({ message: "Sensor not found" });
      return;
    }

    res.status(200).json(sensor);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSensorsByNodeId = async (req: Request, res: Response) => {
  try {
    const { nodeId } = req.params;
    const node = await nodeModel.findById(nodeId);
    if (!node) {
      res.status(404).json({ message: "Node not found" });
      return;
    }
    const sensors = await sensorModel.find({ _id: { $in: node.sensors } });
    res.status(200).json(sensors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const updateSensor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sensor = await sensorModel.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!sensor) {
      res.status(404).json({ message: "Sensor not found" });
      return;
    }
    res.status(200).json(sensor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSensor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sensorExists = await sensorModel.exists({ _id: id });
    if (!sensorExists) {
      res.status(404).json({ message: "Sensor not found" });
      return;
    }
    await sensorModel.deleteOne({ _id: id });

    await nodeModel.updateMany({ sensors: id }, { $pull: { sensors: id } });
    res.status(200).json({ message: "Sensor deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

