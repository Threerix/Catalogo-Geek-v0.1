// backend/src/controllers/batchController.ts

import { Request, Response } from "express";
import { PrismaClient, ItemType } from "@prisma/client";

const prisma = new PrismaClient();

// Interface para tipar os itens geeks
interface GeekItem {
  title: string;
  description: string;
  type: string;
  releaseDate: string;
  imageUrl: string;
}

// Lista com 60 itens geeks famosos
const geekItems: GeekItem[] = [
  // === GAMES ===
  {
    title: "The Legend of Zelda: Breath of the Wild",
    description: "Aventura épica em mundo aberto em Hyrule.",
    type: "GAME",
    releaseDate: "2017-03-03",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.jpg",
  },
  {
    title: "The Witcher 3: Wild Hunt",
    description: "RPG épico com Geralt de Rivia.",
    type: "GAME",
    releaseDate: "2015-05-19",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
  },
  {
    title: "Cyberpunk 2077",
    description: "RPG futurístico em Night City.",
    type: "GAME",
    releaseDate: "2020-12-10",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co2f8w.jpg",
  },
  {
    title: "God of War (2018)",
    description: "Kratos e Atreus em aventura nórdica.",
    type: "GAME",
    releaseDate: "2018-04-20",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg",
  },
  {
    title: "Super Mario Odyssey",
    description: "Mario em aventura mundial com Cappy.",
    type: "GAME",
    releaseDate: "2017-10-27",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1srl.jpg",
  },
  {
    title: "Elden Ring",
    description: "Souls-like em mundo aberto de FromSoftware.",
    type: "GAME",
    releaseDate: "2022-02-25",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg",
  },
  {
    title: "Minecraft",
    description: "Construa e sobreviva em mundo de blocos.",
    type: "GAME",
    releaseDate: "2011-11-18",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co49x5.jpg",
  },
  {
    title: "Pokemon Red",
    description: "Capture todos os 150 Pokemon originais.",
    type: "GAME",
    releaseDate: "1996-02-27",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co4a73.jpg",
  },
  {
    title: "Final Fantasy VII",
    description: "JRPG clássico com Cloud Strife.",
    type: "GAME",
    releaseDate: "1997-01-31",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rfu.jpg",
  },
  {
    title: "Hollow Knight",
    description: "Metroidvania sombrio e desafiador.",
    type: "GAME",
    releaseDate: "2017-02-24",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rgi.jpg",
  },
  {
    title: "Dark Souls III",
    description: "Desafio brutal no mundo sombrio.",
    type: "GAME",
    releaseDate: "2016-03-24",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcz.jpg",
  },
  {
    title: "Hades",
    description: "Roguelike mitológico da Supergiant.",
    type: "GAME",
    releaseDate: "2020-09-17",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co2it5.jpg",
  },
  {
    title: "Tetris",
    description: "Puzzle clássico de blocos.",
    type: "GAME",
    releaseDate: "1984-06-06",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jd6.jpg",
  },
  {
    title: "Super Mario World",
    description: "Mario e Yoshi salvam a Princesa Peach.",
    type: "GAME",
    releaseDate: "1990-11-21",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2w.jpg",
  },
  {
    title: "Street Fighter II",
    description: "Luta clássica da Capcom.",
    type: "GAME",
    releaseDate: "1991-02-06",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1nxc.jpg",
  },
  {
    title: "Sonic the Hedgehog",
    description: "Ouriço azul contra Dr. Robotnik.",
    type: "GAME",
    releaseDate: "1991-06-23",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rs3.jpg",
  },
  {
    title: "Half-Life 2",
    description: "Gordon Freeman contra a Combine.",
    type: "GAME",
    releaseDate: "2004-11-16",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rs7.jpg",
  },
  {
    title: "Chrono Trigger",
    description: "Viagem no tempo épica da Square.",
    type: "GAME",
    releaseDate: "1995-03-11",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xmo.jpg",
  },
  {
    title: "Super Metroid",
    description: "Plataforma sci-fi com Samus Aran.",
    type: "GAME",
    releaseDate: "1994-03-19",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1nxb.jpg",
  },
  {
    title: "Stardew Valley",
    description: "Simulação de fazenda relaxante.",
    type: "GAME",
    releaseDate: "2016-02-26",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xno.jpg",
  },

  // === ANIMES ===
  {
    title: "Dragon Ball Z",
    description: "Saga épica de Goku e os Saiyajins.",
    type: "ANIME",
    releaseDate: "1989-04-26",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1277/142600.jpg",
  },
  {
    title: "Naruto",
    description: "Ninja adolescente busca reconhecimento.",
    type: "ANIME",
    releaseDate: "2002-10-03",
    imageUrl: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
  },
  {
    title: "One Piece",
    description: "Luffy em busca do tesouro supremo.",
    type: "ANIME",
    releaseDate: "1999-10-20",
    imageUrl: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
  },
  {
    title: "Attack on Titan",
    description: "Humanidade vs. Titãs gigantes.",
    type: "ANIME",
    releaseDate: "2013-04-07",
    imageUrl: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
  },
  {
    title: "My Hero Academia",
    description: "Sociedade de super-heróis.",
    type: "ANIME",
    releaseDate: "2016-04-03",
    imageUrl: "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
  },
  {
    title: "Demon Slayer",
    description: "Tanjiro combate demônios.",
    type: "ANIME",
    releaseDate: "2019-04-06",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
  },
  {
    title: "Hunter x Hunter",
    description: "Gon busca seu pai caçador.",
    type: "ANIME",
    releaseDate: "2011-10-02",
    imageUrl: "https://cdn.myanimelist.net/images/anime/11/33657.jpg",
  },
  {
    title: "Fullmetal Alchemist: Brotherhood",
    description: "Irmãos alquimistas buscam Pedra Filosofal.",
    type: "ANIME",
    releaseDate: "2009-04-05",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg",
  },
  {
    title: "Spirited Away",
    description: "Chihiro no mundo dos espíritos.",
    type: "ANIME",
    releaseDate: "2001-07-20",
    imageUrl: "https://cdn.myanimelist.net/images/anime/6/79597.jpg",
  },
  {
    title: "Your Name",
    description: "Dois jovens trocam de corpos.",
    type: "ANIME",
    releaseDate: "2016-08-26",
    imageUrl: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
  },
  {
    title: "Cowboy Bebop",
    description: "Caçadores de recompensa no espaço.",
    type: "ANIME",
    releaseDate: "1998-04-03",
    imageUrl: "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
  },
  {
    title: "Neon Genesis Evangelion",
    description: "Adolescentes pilotam mechas gigantes.",
    type: "ANIME",
    releaseDate: "1995-10-04",
    imageUrl: "https://cdn.myanimelist.net/images/anime/10/21814.jpg",
  },
  {
    title: "One Punch Man",
    description: "Herói que derrota inimigos com um soco.",
    type: "ANIME",
    releaseDate: "2015-10-05",
    imageUrl: "https://cdn.myanimelist.net/images/anime/12/76049.jpg",
  },
  {
    title: "JoJo's Bizarre Adventure",
    description: "Linhagem Joestar através dos séculos.",
    type: "ANIME",
    releaseDate: "2012-10-06",
    imageUrl: "https://cdn.myanimelist.net/images/anime/10/18849.jpg",
  },
  {
    title: "Death Note",
    description: "Estudante com caderno da morte.",
    type: "ANIME",
    releaseDate: "2006-10-04",
    imageUrl: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
  },
  {
    title: "Akira",
    description: "Poderes psíquicos em Neo-Tóquio.",
    type: "ANIME",
    releaseDate: "1988-07-16",
    imageUrl: "https://cdn.myanimelist.net/images/anime/4/28954.jpg",
  },
  {
    title: "Princess Mononoke",
    description: "Conflito entre natureza e industrialização.",
    type: "ANIME",
    releaseDate: "1997-07-12",
    imageUrl: "https://cdn.myanimelist.net/images/anime/7/75919.jpg",
  },
  {
    title: "My Neighbor Totoro",
    description: "Crianças encontram espíritos da floresta.",
    type: "ANIME",
    releaseDate: "1988-04-16",
    imageUrl: "https://cdn.myanimelist.net/images/anime/4/75645.jpg",
  },
  {
    title: "Tokyo Ghoul",
    description: "Estudante meio-ghoul em Tóquio.",
    type: "ANIME",
    releaseDate: "2014-07-04",
    imageUrl: "https://cdn.myanimelist.net/images/anime/5/64449.jpg",
  },
  {
    title: "Mob Psycho 100",
    description: "Estudante com poderes psíquicos.",
    type: "ANIME",
    releaseDate: "2016-07-12",
    imageUrl: "https://cdn.myanimelist.net/images/anime/8/80356.jpg",
  },

  // === MANGÁS ===
  {
    title: "One Piece",
    description: "Piratas em busca do One Piece.",
    type: "MANGA",
    releaseDate: "1997-07-22",
    imageUrl: "https://cdn.myanimelist.net/images/manga/2/253146.jpg",
  },
  {
    title: "Naruto",
    description: "Ninja órfão sonha ser Hokage.",
    type: "MANGA",
    releaseDate: "1999-09-21",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/117681.jpg",
  },
  {
    title: "Dragon Ball",
    description: "Goku coleta as Esferas do Dragão.",
    type: "MANGA",
    releaseDate: "1984-12-03",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/54327.jpg",
  },
  {
    title: "Attack on Titan",
    description: "Humanidade luta contra Titãs.",
    type: "MANGA",
    releaseDate: "2009-09-09",
    imageUrl: "https://cdn.myanimelist.net/images/manga/2/37846.jpg",
  },
  {
    title: "Death Note",
    description: "Estudante com caderno da morte.",
    type: "MANGA",
    releaseDate: "2003-12-01",
    imageUrl: "https://cdn.myanimelist.net/images/manga/1/258245.jpg",
  },
  {
    title: "Fullmetal Alchemist",
    description: "Alquimistas buscam pedra filosofal.",
    type: "MANGA",
    releaseDate: "2001-07-12",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/243675.jpg",
  },
  {
    title: "Berserk",
    description: "Guerra e sobrevivência medieval brutal.",
    type: "MANGA",
    releaseDate: "1989-08-25",
    imageUrl: "https://cdn.myanimelist.net/images/manga/1/157897.jpg",
  },
  {
    title: "Monster",
    description: "Médico persegue assassino em série.",
    type: "MANGA",
    releaseDate: "1994-12-05",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/258749.jpg",
  },
  {
    title: "Chainsaw Man",
    description: "Jovem vira caçador de demônios.",
    type: "MANGA",
    releaseDate: "2018-12-03",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/216464.jpg",
  },
  {
    title: "Demon Slayer",
    description: "Caçadores de demônios no Japão Taishō.",
    type: "MANGA",
    releaseDate: "2016-02-15",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/179023.jpg",
  },
  {
    title: "My Hero Academia",
    description: "Mundo de quirks e heróis.",
    type: "MANGA",
    releaseDate: "2014-07-07",
    imageUrl: "https://cdn.myanimelist.net/images/manga/2/117872.jpg",
  },
  {
    title: "Hunter x Hunter",
    description: "Caçador procura pai desaparecido.",
    type: "MANGA",
    releaseDate: "1998-03-03",
    imageUrl: "https://cdn.myanimelist.net/images/manga/2/253119.jpg",
  },
  {
    title: "Tokyo Ghoul",
    description: "Estudante vira meio-ghoul.",
    type: "MANGA",
    releaseDate: "2011-09-08",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/115308.jpg",
  },
  {
    title: "Spy x Family",
    description: "Família falsa de espião, assassina e telepata.",
    type: "MANGA",
    releaseDate: "2019-03-25",
    imageUrl: "https://cdn.myanimelist.net/images/manga/2/114972.jpg",
  },
  {
    title: "Jujutsu Kaisen",
    description: "Estudante combate maldições.",
    type: "MANGA",
    releaseDate: "2018-03-05",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/210341.jpg",
  },
  {
    title: "Vagabond",
    description: "Samurai Musashi busca perfeição.",
    type: "MANGA",
    releaseDate: "1998-09-17",
    imageUrl: "https://cdn.myanimelist.net/images/manga/1/259070.jpg",
  },
  {
    title: "Vinland Saga",
    description: "Vikings em busca de terra prometida.",
    type: "MANGA",
    releaseDate: "2005-04-13",
    imageUrl: "https://cdn.myanimelist.net/images/manga/2/188925.jpg",
  },
  {
    title: "20th Century Boys",
    description: "Conspiração apocalíptica complexa.",
    type: "MANGA",
    releaseDate: "1999-09-29",
    imageUrl: "https://cdn.myanimelist.net/images/manga/2/253149.jpg",
  },
  {
    title: "Bleach",
    description: "Ceifador substituto protege Karakura.",
    type: "MANGA",
    releaseDate: "2001-08-07",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/180031.jpg",
  },
  {
    title: "Komi Can't Communicate",
    description: "Garota tímida faz amigos no colégio.",
    type: "MANGA",
    releaseDate: "2016-05-18",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/223900.jpg",
  },
];

// Função para popular o banco de dados
async function populateDatabase() {
  console.log("Iniciando população do banco de dados...");

  try {
    // Inserir todos os itens
    for (const item of geekItems) {
      try {
        await prisma.item.create({
          data: {
            title: item.title,
            description: item.description,
            type: item.type as ItemType,
            releaseDate: new Date(item.releaseDate),
            imageUrl: item.imageUrl,
          },
        });
        console.log(`✅ Criado: ${item.title}`);
      } catch (error: any) {
        if (error.code === "P2002") {
          console.log(`⚠️  Item já existe: ${item.title}`);
        } else {
          console.error(`❌ Erro ao criar ${item.title}:`, error.message);
        }
      }
    }

    console.log(
      `\n🎉 População concluída! ${geekItems.length} itens processados.`
    );

    // Estatísticas finais
    const totalItems = await prisma.item.count();
    const gameCount = await prisma.item.count({ where: { type: "GAME" } });
    const animeCount = await prisma.item.count({ where: { type: "ANIME" } });
    const mangaCount = await prisma.item.count({ where: { type: "MANGA" } });

    console.log("\n📊 Estatísticas do banco:");
    console.log(`Total de itens: ${totalItems}`);
    console.log(`Jogos: ${gameCount}`);
    console.log(`Animes: ${animeCount}`);
    console.log(`Mangás: ${mangaCount}`);
  } catch (error) {
    console.error("Erro durante a população:", error);
    throw error;
  }
}

// Endpoint para popular o banco com os dados pré-definidos
export const populateWithGeekItems = async (req: Request, res: Response) => {
  try {
    console.log("Iniciando população do banco via API...");

    // Executar o script de população
    await populateDatabase();

    // Retornar estatísticas
    const totalItems = await prisma.item.count();
    const gameCount = await prisma.item.count({ where: { type: "GAME" } });
    const animeCount = await prisma.item.count({ where: { type: "ANIME" } });
    const mangaCount = await prisma.item.count({ where: { type: "MANGA" } });

    res.status(200).json({
      success: true,
      message: "Banco populado com sucesso!",
      stats: {
        total: totalItems,
        games: gameCount,
        animes: animeCount,
        mangas: mangaCount,
      },
    });
  } catch (error) {
    console.error("Erro ao popular banco:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor ao popular banco de dados",
    });
  }
};

// Endpoint para criar múltiplos itens de uma vez
export const createBatchItems = async (req: Request, res: Response) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({
      error: "Campo 'items' deve ser um array",
    });
  }

  const results = {
    created: 0,
    skipped: 0,
    errors: [] as string[],
  };

  try {
    for (const item of items) {
      const { title, description, type, releaseDate, imageUrl } = item;

      // Validação básica
      if (!title || !description || !type || !releaseDate) {
        results.errors.push(
          `Item sem dados obrigatórios: ${title || "sem título"}`
        );
        continue;
      }

      if (!Object.values(ItemType).includes(type)) {
        results.errors.push(`Tipo inválido para ${title}: ${type}`);
        continue;
      }

      try {
        await prisma.item.create({
          data: {
            title,
            description,
            type,
            releaseDate: new Date(releaseDate),
            imageUrl: imageUrl || null,
          },
        });
        results.created++;
      } catch (error: any) {
        if (error.code === "P2002") {
          results.skipped++;
        } else {
          results.errors.push(`Erro ao criar ${title}: ${error.message}`);
        }
      }
    }

    res.status(200).json({
      success: true,
      results,
      message: `Processados ${items.length} itens. ${results.created} criados, ${results.skipped} já existiam.`,
    });
  } catch (error) {
    console.error("Erro no batch create:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor ao processar batch de itens",
    });
  }
};

// Endpoint para obter estatísticas do banco
export const getDatabaseStats = async (req: Request, res: Response) => {
  try {
    const [totalItems, gameCount, animeCount, mangaCount] = await Promise.all([
      prisma.item.count(),
      prisma.item.count({ where: { type: "GAME" } }),
      prisma.item.count({ where: { type: "ANIME" } }),
      prisma.item.count({ where: { type: "MANGA" } }),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        total: totalItems,
        byType: {
          games: gameCount,
          animes: animeCount,
          mangas: mangaCount,
        },
      },
    });
  } catch (error) {
    console.error("Erro ao obter estatísticas:", error);
    res.status(500).json({
      success: false,
      error: "Erro ao obter estatísticas do banco",
    });
  }
};

// Endpoint para buscar itens com filtros avançados
export const getItemsWithFilters = async (req: Request, res: Response) => {
  try {
    const { type, search, sortBy, order, page = 1, limit = 10 } = req.query;

    // Construir objeto where para filtros
    const where: any = {};

    if (type && Object.values(ItemType).includes(type as ItemType)) {
      where.type = type;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: "insensitive" } },
        { description: { contains: search as string, mode: "insensitive" } },
      ];
    }

    // Configurar ordenação
    const orderBy: any = {};
    if (sortBy) {
      orderBy[sortBy as string] = order === "desc" ? "desc" : "asc";
    } else {
      orderBy.createdAt = "desc";
    }

    // Calcular paginação
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Buscar itens e total
    const [items, total] = await Promise.all([
      prisma.item.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      }),
      prisma.item.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: items,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar itens com filtros:", error);
    res.status(500).json({
      success: false,
      error: "Erro ao buscar itens",
    });
  }
};