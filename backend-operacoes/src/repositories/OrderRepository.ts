import database from "../db/database";
import { Order } from "../models/Order";

class OrderRepository {
  static createOrder(order: Order, callback: (order?: Order) => void): void {
    const sql =
      "INSERT INTO Orders (client_id, stock_id, quantity, date, total_value) VALUES (?, ?, ?, ?, ?)";
    const params = [
      order.client_id,
      order.stock_id,
      order.quantity,
      order.total_value,
    ];

    database.run(sql, params, function (err) {
      if (err) {
        console.error("Erro ao criar pedido:", err);
        callback();
        return;
      }
      const orderID = this.lastID;
      const newOrder: Order = { ...order, code: orderID };
      callback(newOrder);
    });
  }
  static getOrderById(code: number, callback: (order?: Order) => void): void {
    const sql = "SELECT * FROM Clients WHERE code = ?";
    const params = [code];
    database.get(sql, params, (err, row) => {
      if (err) {
        console.error("Erro ao pegar ID do pedido:", err);
        callback();
        return;
      }
      callback(row as Order);
    });
  }
}
export default OrderRepository;
