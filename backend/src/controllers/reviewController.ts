import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middlewares/authMiddleware";

const prisma = new PrismaClient();

export const createReview = async (req: AuthRequest, res: Response) => {
  const { itemId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Usuário não autenticado." });
  }

  if (!itemId || !rating) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios ausentes (itemId ou rating)." });
  }

  try {
    const newReview = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment: comment ? String(comment) : null,
        itemId: Number(itemId),
        userId: Number(userId),
      },
    });

    return res.status(201).json(newReview);
  } catch (error) {
    console.error("Erro ao criar review:", error);
    return res.status(400).json({
      error: "Não foi possível criar o review. Verifique se o item existe.",
    });
  }
};

// ➕ novo controller
export const getUserReviews = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Usuário não autenticado." });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { userId: Number(userId) },
      include: { item: true },
      orderBy: { createdAt: "desc" },
    });

    const count = await prisma.review.count({
      where: { userId: Number(userId) },
    });

    return res.status(200).json({
      count,
      reviews,
    });
  } catch (error) {
    console.error("Erro ao buscar reviews do usuário:", error);
    return res
      .status(500)
      .json({ error: "Erro ao buscar reviews do usuário." });
  }
};
