import { Request, Response } from "express";
import StockRepository from "../repositories/StockRepository";

class StockController {
  static createStock(req: Request, res: Response): void {
    const { company, symbol, current_price } = req.body;

    if (!company || !symbol || !current_price) {
      res.status(400).json({
        message: "company,symbol, current_price e id são necessários.",
      });
      return;
    }

    StockRepository.createStock(
      {
        company,
        symbol,
        current_price,
      },
      (stock) => {
        if (stock) {
          res.status(201).json(stock);
        } else {
          res.status(500).json({ message: "Falha ao criar ação." });
        }
      }
    );
  }

  static getStockById(req: Request, res: Response): void {
    const stockId = parseInt(req.params.id, 10);

    StockRepository.getStockById(stockId, (stock) => {
      if (stock) {
        res.json(stock);
      } else {
        res.status(404).json({ message: "Ação não encontrada." });
      }
    });
  }

  static updateStockPrice(req: Request, res: Response): void {
    const { currentPrice, id } = req.body;

    if (!currentPrice || isNaN(currentPrice)) {
      res
        .status(400)
        .json({ message: "O preço atual é obrigatório e deve ser um número." });
      return;
    }

    StockRepository.updateStock(id, currentPrice, (success) => {
      if (success) {
        res
          .status(200)
          .json({ message: "Preço da ação alterado com sucesso." });
      } else {
        res.status(500).json({ message: "Falha ao atualizar preço da ação." });
      }
    });
  }

  static deleteStock(req: Request, res: Response): void {
    const stockId = parseInt(req.params.id, 10);

    StockRepository.deleteStock(stockId, (success) => {
      if (success) {
        res.status(200).json({ message: "Ação deletada com sucesso." });
      } else {
        res.status(500).json({ message: "Falha ao deletar ação." });
      }
    });
  }

  static getAllStocks(req: Request, res: Response): void {
    StockRepository.getAllStocks((stocks) => {
      res.json(stocks);
    });
  }
}
export default StockController;
