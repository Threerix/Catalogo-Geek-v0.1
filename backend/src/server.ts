// backend/src/server.ts
import express from "express";
import cors from "cors"; 
import apiRoutes from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware que habilita CORS (Cross-Origin Resource Sharing).
app.use(cors()); 

// Middleware essencial que faz o "parse" do corpo das requisições de JSON para um objeto JavaScript.
// Sem ele, `req.body` seria `undefined`.
app.use(express.json());

// Middleware que direciona todas as requisições que começam com '/api' para nosso arquivo de rotas.
// Ex: Uma requisição para http://localhost:3000/api/register será tratada pelo nosso `apiRoutes`.
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`🧠 Servidor Backend rodando em http://localhost:${PORT}`);
});
