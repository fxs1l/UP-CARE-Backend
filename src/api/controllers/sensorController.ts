import { Request, Response } from "express";

export const createSensor = async (req: Request, res: Response) => {
  try {
    const { name, nodeId } = req.body;

    res.status(201).json(req.body);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSensors = async (req: Request, res: Response) => {
  try {
    res.status(200).json(req.body);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSensorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    res.status(200).json(req.body);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSensorsByNodeId = async (req: Request, res: Response) => {
  try {
    const { nodeId } = req.params;

    res.status(200).json(req.body);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const updateSensor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    res.status(200).json(req.body);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSensor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    res.status(200).json({ message: "Sensor deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

