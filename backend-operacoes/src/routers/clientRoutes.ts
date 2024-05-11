import express from "express";
import ClientController from "../controller/ClientController";

const clientRoutes = express.Router();

clientRoutes.post("/users", ClientController.createClient);
clientRoutes.get("/users/:id", ClientController.getClientById);

export default clientRoutes;
