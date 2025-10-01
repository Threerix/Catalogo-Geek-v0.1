import { Router } from "express";

// Importações existentes...
import { register, login } from "./controllers/authController";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} from "./controllers/itemController";

// NOVA importação do nosso middleware de autenticação
import { authMiddleware } from "./middlewares/authMiddleware";
// NOVAS importações do nosso controlador de review
import { createReview, getUserReviews } from "./controllers/reviewController";
// NOVA importação do nosso controlador de batch
import {
  populateWithGeekItems,
  createBatchItems,
  getDatabaseStats,
  getItemsWithFilters,
} from "./controllers/batchController";

const router = Router();

// --- Rotas de Autenticação ---
router.post("/register", register);
router.post("/login", login);

// --- Rotas de Itens (CRUD) ---
router.post("/items", createItem);
router.get("/items", getAllItems);
router.get("/items/filtered", getItemsWithFilters); // Movida para antes de :id
router.get("/items/:id", getItemById);

// Futuramente, podemos proteger as rotas de update e delete também!
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

// Criar um review para um item específico
router.post("/items/:itemId/reviews", authMiddleware, createReview);

// Obter todas as reviews do usuário logado (+ count)
router.get("/me/reviews", authMiddleware, getUserReviews);

// Rota para popular o banco com itens geeks pré-definidos
router.post("/populate", populateWithGeekItems);

// Rota para criar múltiplos itens de uma vez
router.post("/batch/items", createBatchItems); // Mudada para evitar conflito

// Rota para obter estatísticas do banco de dados
router.get("/stats", getDatabaseStats);

export default router;

import { updateAvatar } from "./controllers/userController";

router.put("/me/avatar", authMiddleware, updateAvatar);

