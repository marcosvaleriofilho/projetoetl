import database from "../db/database";
import { Stock } from "../models/Stock";

export default class StockRepository {
  static createStock(stock: Stock, callback: (stock?: Stock) => void): void {
    const sql =
      "INSERT INTO Stocks (symbol, .company, .current_price) VALUES (?, ?, ?)";
    const params = [stock.symbol, stock.company, stock.current_price];

    database.run(sql, params, function (err) {
      if (err) {
        console.error("Erro criando ao criar ação:", err);
        callback();
        return;
      }
      const IdAcao = this.lastID;
      const novaAcao: Stock = { ...stock, id: IdAcao };
      callback(novaAcao);
    });
  }

  static getStockById(id: number, callback: (stock?: Stock) => void): void {
    const sql = "SELECT * FROM Stocks WHERE id = ?";
    const params = [id];
    database.get(sql, params, (err, row) => {
      if (err) {
        console.error("Erro ao buscar ação pelo ID:", err);
        callback();
        return;
      }
      callback(row as Stock);
    });
  }

  static updateStock(
    id: number,
    currentPrice: number,
    callback: (success: boolean) => void
  ): void {
    const sql = "UPDATE Stocks SET currentPrice = ? WHERE id = ?";
    const params = [currentPrice, id];
    database.run(sql, params, function (err) {
      if (err) {
        console.error("Erro atualizando ação:", err);
        callback(false);
        return;
      }
      callback(true);
    });
  }

  static deleteStock(id: number, callback: (success: boolean) => void): void {
    const sql = "DELETE FROM Stocks WHERE id = ?";
    const params = [id];

    database.run(sql, params, function (err) {
      if (err) {
        console.error("Erro ao deletar ação:", err);
        callback(false);
        return;
      }
      callback(true);
    });
  }

  static getAllStocks(callback: (stocks: Stock[]) => void): void {
    const sql = "SELECT * FROM Stocks";

    database.all(sql, (err, rows) => {
      if (err) {
        console.error("Erro ao buscar todas ações:", err);
        callback([]);
        return;
      }
      const stocks: Stock[] = rows.map((row) => row as Stock);
      callback(stocks);
    });
  }
}
