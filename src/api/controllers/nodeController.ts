// import { Request, Response } from "express";
// // import nodeModel from "@/api/models/nodeModel";

// export const createNode = async (req: Request, res: Response) => {
//   try {
//     const { name, type } = req.body;
//     const nodeExists = await nodeModel.exists({ name, type });
//     if (nodeExists) {
//       res.status(400).json({ message: "Node already exists" });
//       return;
//     }
//     const node = await nodeModel.create(req.body);
//     await node.save();
//     res.status(201).json(node);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getNodes = async (req: Request, res: Response) => {
//   try {
//     const nodes = await nodeModel.find();
//     res.status(200).json(nodes);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateNode = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { sensors } = req.body;
//     if (sensors) {
//       res.status(404).json({ message: "Sensors cannot be updated here. Use api/sensors/node/:id instead" });
//       return;
//     }
//     const node = await nodeModel.findOneAndUpdate({ _id: id }, req.body, { new: true });
//     res.status(200).json(node);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteNode = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const node = await nodeModel.deleteOne({ _id: id });
//     res.status(200).json(node);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };
