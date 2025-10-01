// backend/src/controllers/itemController.ts

import { Request, Response } from "express";
import { PrismaClient, ItemType } from "@prisma/client";

const prisma = new PrismaClient();

// 1. CREATE - Criar um novo item (versão limpa, sem logs extras)
export const createItem = async (req: Request, res: Response) => {
  const { title, description, type, releaseDate, imageUrl } = req.body;

  if (!Object.values(ItemType).includes(type)) {
    return res.status(400).json({
      error: "Tipo de item inválido. Use 'GAME', 'ANIME' ou 'MANGA'.",
    });
  }

  try {
    const newItem = await prisma.item.create({
      data: {
        title,
        description,
        type,
        releaseDate: new Date(releaseDate),
        imageUrl,
      },
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Erro ao criar item:", error);
    res.status(400).json({
      error: "Não foi possível criar o item. Verifique os dados fornecidos.",
    });
  }
};

// 2. READ - Listar todos os itens
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os itens." });
  }
};

// 3. READ - Obter um item específico pelo ID (COM A CORREÇÃO)
export const getItemById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const item = await prisma.item.findUnique({
      where: {
        id: parseInt(id),
      },
      // --- MUDANÇA PRINCIPAL AQUI ---
      // Pedimos ao Prisma para incluir na resposta todos os 'reviews'
      // relacionados a este item.
      include: {
        reviews: {
          // Opcional: ordena os reviews para que os mais recentes apareçam primeiro.
          orderBy: {
            createdAt: "desc",
          },
          // Para cada review, inclua também os dados do usuário que o escreveu.
          include: {
            user: {
              // Para não expor dados sensíveis como a senha, selecionamos apenas o nome.
              select: {
                name: true,
              },
            },
          },
        },
      },
      // --- FIM DA MUDANÇA ---
    });

    if (!item) {
      return res.status(404).json({ error: "Item não encontrado." });
    }

    // Log para confirmar que os dados estão sendo enviados corretamente para o frontend
    console.log(
      `Enviando dados para o item ID ${id}:`,
      JSON.stringify(item, null, 2)
    );

    res.status(200).json(item);
  } catch (error) {
    console.error(`Erro ao buscar o item ID ${id}:`, error);
    res.status(500).json({ error: "Erro ao buscar o item." });
  }
};

// 4. UPDATE - Atualizar um item existente
export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, type, releaseDate, imageUrl } = req.body;

  if (type && !Object.values(ItemType).includes(type)) {
    return res.status(400).json({ error: "Tipo de item inválido." });
  }

  try {
    const updatedItem = await prisma.item.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        description,
        type,
        releaseDate: releaseDate ? new Date(releaseDate) : undefined,
        imageUrl,
      },
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    res
      .status(404)
      .json({ error: "Item não encontrado ou falha ao atualizar." });
  }
};

// 5. DELETE - Deletar um item
export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.item.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Item não encontrado ou falha ao deletar." });
  }
};
