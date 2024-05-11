import express from "express";
import StockController from "../controller/StockController";

const stockRoutes = express.Router();

stockRoutes.post("/stocks", StockController.createStock);
stockRoutes.get("/stocks/:id", StockController.getStockById);
stockRoutes.get("/stocks", StockController.getAllStocks);
stockRoutes.put("/stocks/update", StockController.updateStockPrice);
stockRoutes.delete("/stocks/delete/:id", StockController.deleteStock);

export default stockRoutes;
