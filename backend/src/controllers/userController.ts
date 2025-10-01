import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middlewares/authMiddleware";

const prisma = new PrismaClient();

export const updateAvatar = async (req: AuthRequest, res: Response) => {
  const { avatarUrl } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Usuário não autenticado." });
  }

  // Valida se foi realmente enviado algo
  if (!avatarUrl) {
    return res.status(400).json({ error: "Avatar não fornecido." });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
    });

    return res.json({
      message: "Avatar atualizado com sucesso!",
      avatarUrl: updatedUser.avatarUrl,
    });
  } catch (err) {
    console.error("Erro ao atualizar avatar:", err);
    return res.status(500).json({ error: "Erro ao atualizar o avatar" });
  }
};
