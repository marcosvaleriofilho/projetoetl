import { Request, Response } from "express";
import OrderRepository from "../repositories/OrderRepository";
import { Order } from "../models/Order";

class OrderController {
  static createOrder(req: Request, res: Response): void {
    const order: Order = req.body;

    OrderRepository.createOrder(order, (newOrder?: Order) => {
      if (newOrder) {
        res.status(201).json(newOrder);
      } else {
        res.status(500).json({ error: "Falha ao criar pedido" });
      }
    });
  }

  static getOrderById(req: Request, res: Response): void {
    const code: number = parseInt(req.params.code);

    OrderRepository.getOrderById(code, (order?: Order) => {
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ error: "Pedido não encontrado." });
      }
    });
  }
}

export default OrderController;
