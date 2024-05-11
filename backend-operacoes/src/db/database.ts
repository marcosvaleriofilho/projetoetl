import sqlite3 from "sqlite3";

const DBSOURCE = "db.sqlite";

const DDL_SCRIPT = `
  CREATE TABLE IF NOT EXISTS Clients(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    cpf TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS Stocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    symbol TEXT UNIQUE NOT NULL,
    current_price REAL NOT NULL,
  );

  CREATE TABLE IF NOT EXISTS Orders (
    code INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    stock_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES Clients(id),
    FOREIGN KEY (stock_id) REFERENCES Stocks(id)
  );
`;

const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Banco conectado.");
    database.exec(DDL_SCRIPT, (err) => {
      if (err) {
        console.error("Erro criando tabelas:", err);
        throw err;
      }
      console.log("Tabelas criadas(se elas não existem).");
    });
  }
});

export default database;
