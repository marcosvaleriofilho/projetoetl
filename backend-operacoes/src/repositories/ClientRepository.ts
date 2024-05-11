import database from "../db/database";
import Client from "../models/Client";

class ClientRepository {
  static createClient(
    client: Client,
    callback: (client?: Client) => void
  ): void {
    const sql = "INSERT INTO Clients (username, cpf) VALUES (?,?)";
    const params = [client.username, client.cpf];

    database.run(sql, params, function (err) {
      if (err) {
        console.error("Erro ao criar usuário:", err);
        callback();
        return;
      }
      const clientID = this.lastID;
      const newClient: Client = { ...client, id: clientID };
      callback(newClient);
    });
  }
  static getClientById(id: number, callback: (client?: Client) => void): void {
    const sql = "SELECT * FROM Clients WHERE id = ?";
    const params = [id];
    database.get(sql, params, (err, row) => {
      if (err) {
        console.error("Erro ao pegar ID do cliente:", err);
        callback();
        return;
      }
      callback(row as Client);
    });
  }
}
export default ClientRepository;
