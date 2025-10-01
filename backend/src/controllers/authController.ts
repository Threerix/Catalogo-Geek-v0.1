import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Idealmente mova isso para process.env.JWT_SECRET
const JWT_SECRET =
  process.env.JWT_SECRET || "SEGREDO_SUPER_SECRETO_PARA_O_PROJETO_GEEK";

// Lista de avatares geeks de placeholder
const geekAvatars = [
  "https://i.pinimg.com/564x/ff/a0/9a/ffa09acd570df7bd90b013c2c0e87b23.jpg", // Goku
  "https://i.pinimg.com/564x/b3/17/67/b31767c4c0eb8b72a2e8f6ac85b6d3e3.jpg", // Naruto
  "https://i.pinimg.com/564x/8b/5a/9f/8b5a9f6d5c7e2f3a8b9d4c1e6f8a2b5c.jpg", // Link Zelda
  "https://i.pinimg.com/564x/2d/8f/1a/2d8f1a9b7c5e4f2d6a8b3c9e1f4a7b2d.jpg", // Pikachu
  "https://i.pinimg.com/564x/9c/4e/7a/9c4e7a1b8d6f2e5a9c3b7e4d1a8f6b2c.jpg", // Mario
  "https://i.pinimg.com/564x/6a/2c/8e/6a2c8e9b4d7f1a5e8c2b9d6e3a7f4b1c.jpg", // Luffy
  "https://i.pinimg.com/564x/1e/9b/5d/1e9b5d7a4f2c8e6b1d9a5c8e2f7b4a6d.jpg", // Sonic
  "https://i.pinimg.com/564x/8c/1f/6e/8c1f6e3b9a7d2f5e8c4b1d7a9e6f2b5c.jpg", // Master Chief
  "https://i.pinimg.com/564x/5f/8a/2d/5f8a2d1c9e6b4f7a2d8c5b9e1a7f4c6b.jpg", // Vegeta
  "https://i.pinimg.com/564x/3b/6e/9a/3b6e9a8d2f5c7b1e4a9d6c8f2b5e7a1d.jpg", // Samus
];

// ------------------ REGISTER ------------------
export const register = async (req: Request, res: Response) => {
  const { email, name, password, avatarUrl } = req.body;

  try {
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ error: "Por favor, preencha todos os campos." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        avatarUrl:
          avatarUrl ||
          geekAvatars[Math.floor(Math.random() * geekAvatars.length)],
      },
    });

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      userId: user.id,
      avatarUrl: user.avatarUrl,
    });
  } catch (error) {
    res.status(400).json({ error: "Este e-mail já está em uso." });
  }
};

// ------------------ LOGIN ------------------
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "8h",
    });

    res.json({
      message: "Login bem-sucedido!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
  }
};
