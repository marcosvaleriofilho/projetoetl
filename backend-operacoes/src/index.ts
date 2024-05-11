import express from "express";
import cors from "cors";
import clientRoutes from "./routers/clientRoutes";
import stockRoutes from "./routers/stockRoutes";
import orderRoutes from "./routers/orderRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", clientRoutes);
app.use("/api", stockRoutes);
app.use("/api", orderRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

app.use((req, res) => {
  res.status(404);
});

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "http://localhost";

app.listen(PORT, () => {
  console.log(`Servidor funcionando: ${HOSTNAME}:${PORT}`);
});
