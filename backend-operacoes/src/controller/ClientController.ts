import { Request, Response } from "express";
import ClientRepository from "../repositories/ClientRepository";

class ClientController {
  static createClient(req: Request, res: Response): void {
    const { username, cpf } = req.body;

    if (!username || !cpf) {
      res.status(400).json({ message: "É necessário Email, Usuário e senha" });
      return;
    }

    ClientRepository.createClient(
      {
        username,
        cpf,
      },
      (client) => {
        if (client) {
          res.status(201).json(client);
        } else {
          res.status(500).json({ message: "Falha ao criar usuário." });
        }
      }
    );
  }

  static getClientById(req: Request, res: Response): void {
    const clientId = parseInt(req.params.id, 10);

    ClientRepository.getClientById(clientId, (client) => {
      if (client) {
        res.json(client);
      } else {
        res.status(404).json({ message: "Usuário não encontrado." });
      }
    });
  }
}
export default ClientController;
