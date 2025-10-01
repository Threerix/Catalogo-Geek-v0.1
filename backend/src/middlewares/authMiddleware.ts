// backend/src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Recupera a chave secreta do JWT. Lembre-se, o ideal é que ela venha de uma variável de ambiente.
const JWT_SECRET = "SEGREDO_SUPER_SECRETO_PARA_O_PROJETO_GEEK";

// Estendemos a interface Request do Express para incluir nossa propriedade 'user'
// Isso é uma boa prática com TypeScript para evitar erros de tipo.
export interface AuthRequest extends Request {
  user?: { userId: number };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // 1. Pega o token do cabeçalho 'Authorization'. O formato padrão é "Bearer <token>".
  const authHeader = req.headers.authorization;

  // 2. Se não houver cabeçalho, o usuário não está autenticado.
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Acesso negado. Nenhum token fornecido." });
  }

  // 3. Divide a string "Bearer <token>" para pegar apenas o token.
  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res.status(401).json({ error: "Erro no formato do token." });
  }
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token mal formatado." });
  }

  // 4. Verifica se o token é válido.
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido." });
    }

    // 5. Se o token for válido, `decoded` terá o payload que guardamos (nosso objeto { userId: ... }).
    // Anexamos essa informação na requisição (`req.user`) para que a próxima função (o controller) possa usá-la.
    req.user = decoded as { userId: number };

    // 6. Chama `next()` para passar a requisição para o próximo handler na cadeia (nosso controller).
    return next();
  });
};
