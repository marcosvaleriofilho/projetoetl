import express, { Router } from "express";
import OrderController from "../controller/OrderController";

const orderRoutes = express.Router();

orderRoutes.post("/", OrderController.createOrder);
orderRoutes.get("/:code", OrderController.getOrderById);

export default orderRoutes;
