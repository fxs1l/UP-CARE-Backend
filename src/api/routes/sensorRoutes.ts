import express from "express";
import { createSensor, deleteSensor, getSensorById, getSensors, getSensorsByNodeId, updateSensor } from "@/api/controllers/sensorController";
import { sensorEndpoint } from "@/constants/url";

const router = express.Router();

router.post(sensorEndpoint, createSensor);
router.get(sensorEndpoint, getSensors);
router.get(`${sensorEndpoint}/:id`, getSensorById);
router.get(`${sensorEndpoint}/node/:nodeId`, getSensorsByNodeId);
router.put(`${sensorEndpoint}/:id`, updateSensor);
router.patch(`${sensorEndpoint}/:id`, updateSensor);
router.delete(`${sensorEndpoint}/:id`, deleteSensor);

export default router;
