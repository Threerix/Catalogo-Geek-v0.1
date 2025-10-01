// backend/src/scripts/populateDatabase.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Lista completa com 75 itens únicos (25 de cada categoria)
const geekItems = [
  // === GAMES (25 itens) ===
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
    title: "Grand Theft Auto V",
    description: "Crime e caos em Los Santos.",
    type: "GAME",
    releaseDate: "2013-09-17",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.jpg",
  },
  {
    title: "Red Dead Redemption 2",
    description: "Faroeste épico da Rockstar.",
    type: "GAME",
    releaseDate: "2018-10-26",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg",
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
    title: "Horizon Zero Dawn",
    description: "Pós-apocalipse com dinossauros robóticos.",
    type: "GAME",
    releaseDate: "2017-02-28",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1u5m.jpg",
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
    title: "Dark Souls III",
    description: "Desafio brutal no mundo sombrio.",
    type: "GAME",
    releaseDate: "2016-03-24",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcz.jpg",
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
    title: "Final Fantasy VII",
    description: "JRPG clássico com Cloud Strife.",
    type: "GAME",
    releaseDate: "1997-01-31",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rfu.jpg",
  },
  {
    title: "Pokemon Red Version",
    description: "Capture todos os 150 Pokemon originais.",
    type: "GAME",
    releaseDate: "1996-02-27",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co4a73.jpg",
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
    title: "Hades",
    description: "Roguelike mitológico da Supergiant.",
    type: "GAME",
    releaseDate: "2020-09-17",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co2it5.jpg",
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
  {
    title: "Tetris",
    description: "Puzzle clássico de blocos que caem.",
    type: "GAME",
    releaseDate: "1984-06-06",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jd6.jpg",
  },
  {
    title: "Pac-Man",
    description: "Come pontos e foge dos fantasmas.",
    type: "GAME",
    releaseDate: "1980-05-22",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co4ma9.jpg",
  },
  {
    title: "Mortal Kombat",
    description: "Luta brutal com Fatalities.",
    type: "GAME",
    releaseDate: "1992-10-08",
    imageUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r2h.jpg",
  },

  // === ANIMES (25 itens) ===
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
    title: "Hunter x Hunter (2011)",
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
    title: "Bleach",
    description: "Ichigo como ceifador de almas.",
    type: "ANIME",
    releaseDate: "2004-10-05",
    imageUrl: "https://cdn.myanimelist.net/images/anime/10/21348.jpg",
  },
  {
    title: "Yu Yu Hakusho",
    description: "Yusuke como detetive espiritual.",
    type: "ANIME",
    releaseDate: "1992-10-10",
    imageUrl: "https://cdn.myanimelist.net/images/anime/8/75592.jpg",
  },
  {
    title: "Spirited Away",
    description: "Chihiro no mundo dos espíritos.",
    type: "ANIME",
    releaseDate: "2001-07-20",
    imageUrl: "https://cdn.myanimelist.net/images/anime/6/79597.jpg",
  },
  {
    title: "My Neighbor Totoro",
    description: "Crianças encontram espíritos da floresta.",
    type: "ANIME",
    releaseDate: "1988-04-16",
    imageUrl: "https://cdn.myanimelist.net/images/anime/4/75645.jpg",
  },
  {
    title: "Princess Mononoke",
    description: "Conflito entre natureza e industrialização.",
    type: "ANIME",
    releaseDate: "1997-07-12",
    imageUrl: "https://cdn.myanimelist.net/images/anime/7/75919.jpg",
  },
  {
    title: "Castle in the Sky",
    description: "Aventura em cidade flutuante.",
    type: "ANIME",
    releaseDate: "1986-08-02",
    imageUrl: "https://cdn.myanimelist.net/images/anime/5/75760.jpg",
  },
  {
    title: "Howl's Moving Castle",
    description: "Sophie e o castelo ambulante.",
    type: "ANIME",
    releaseDate: "2004-11-20",
    imageUrl: "https://cdn.myanimelist.net/images/anime/5/75810.jpg",
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
  {
    title: "Code Geass",
    description: "Príncipe exilado busca vingança.",
    type: "ANIME",
    releaseDate: "2006-10-06",
    imageUrl: "https://cdn.myanimelist.net/images/anime/5/50331.jpg",
  },

  // === MANGÁS (25 itens) ===
  {
    title: "One Piece (Manga)",
    description: "Piratas em busca do One Piece.",
    type: "MANGA",
    releaseDate: "1997-07-22",
    imageUrl: "https://cdn.myanimelist.net/images/manga/2/253146.jpg",
  },
  {
    title: "Naruto (Manga)",
    description: "Ninja órfão sonha ser Hokage.",
    type: "MANGA",
    releaseDate: "1999-09-21",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/117681.jpg",
  },
  {
    title: "Dragon Ball (Manga)",
    description: "Goku coleta as Esferas do Dragão.",
    type: "MANGA",
    releaseDate: "1984-12-03",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/54327.jpg",
  },
  {
    title: "Attack on Titan (Manga)",
    description: "Humanidade luta contra Titãs.",
    type: "MANGA",
    releaseDate: "2009-09-09",
    imageUrl: "https://cdn.myanimelist.net/images/manga/2/37846.jpg",
  },
  {
    title: "Death Note (Manga)",
    description: "Estudante com caderno da morte.",
    type: "MANGA",
    releaseDate: "2003-12-01",
    imageUrl: "https://cdn.myanimelist.net/images/manga/1/258245.jpg",
  },
  {
    title: "Fullmetal Alchemist (Manga)",
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
    title: "Demon Slayer (Manga)",
    description: "Caçadores de demônios no Japão Taishō.",
    type: "MANGA",
    releaseDate: "2016-02-15",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/179023.jpg",
  },
  {
    title: "My Hero Academia (Manga)",
    description: "Mundo de quirks e heróis.",
    type: "MANGA",
    releaseDate: "2014-07-07",
    imageUrl: "https://cdn.myanimelist.net/images/manga/2/117872.jpg",
  },
  {
    title: "Hunter x Hunter (Manga)",
    description: "Caçador procura pai desaparecido.",
    type: "MANGA",
    releaseDate: "1998-03-03",
    imageUrl: "https://cdn.myanimelist.net/images/manga/2/253119.jpg",
  },
  {
    title: "Tokyo Ghoul (Manga)",
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
    title: "Bleach (Manga)",
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
  {
    title: "JoJo's Bizarre Adventure (Manga)",
    description: "Linhagem Joestar através dos séculos.",
    type: "MANGA",
    releaseDate: "1987-01-01",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/37707.jpg",
  },
  {
    title: "One Punch Man (Manga)",
    description: "Herói que derrota inimigos com um soco.",
    type: "MANGA",
    releaseDate: "2012-06-14",
    imageUrl: "https://cdn.myanimelist.net/images/manga/3/80080.jpg",
  },
  {
    title: "Slam Dunk",
    description: "Basquete colegial japonês.",
    type: "MANGA",
    releaseDate: "1990-10-01",
    imageUrl: "https://cdn.myanimelist.net/images/manga/2/258749.jpg",
  },
  {
    title: "Akira (Manga)",
    description: "Poderes psíquicos em Neo-Tóquio.",
    type: "MANGA",
    releaseDate: "1982-12-20",
    imageUrl: "https://cdn.myanimelist.net/images/manga/1/64364.jpg",
  },
  {
    title: "Ghost in the Shell",
    description: "Ciborgue investiga crimes cibernéticos.",
    type: "MANGA",
    releaseDate: "1989-04-22",
    imageUrl: "https://cdn.myanimelist.net/images/manga/1/72165.jpg",
  },
];

// Função para popular o banco de dados
async function populateDatabase() {
  console.log("🚀 Iniciando população do banco de dados...");
  console.log(`📦 Processando ${geekItems.length} itens únicos\n`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  try {
    for (const item of geekItems) {
      try {
        await prisma.item.create({
          data: {
            title: item.title,
            description: item.description,
            type: item.type as "GAME" | "ANIME" | "MANGA",
            releaseDate: new Date(item.releaseDate),
            imageUrl: item.imageUrl,
          },
        });
        created++;
        console.log(`✅ Criado: ${item.title}`);
      } catch (error: any) {
        if (error.code === "P2002") {
          skipped++;
          console.log(`⚠️  Item já existe: ${item.title}`);
        } else {
          errors++;
          console.error(`❌ Erro ao criar ${item.title}:`, error.message);
        }
      }
    }

    console.log(`\n🎉 População concluída!`);
    console.log(`✅ Criados: ${created}`);
    console.log(`⚠️  Pulados (já existiam): ${skipped}`);
    console.log(`❌ Erros: ${errors}`);

    // Estatísticas finais
    const totalItems = await prisma.item.count();
    const gameCount = await prisma.item.count({ where: { type: "GAME" } });
    const animeCount = await prisma.item.count({ where: { type: "ANIME" } });
    const mangaCount = await prisma.item.count({ where: { type: "MANGA" } });

    console.log("\n📊 Estatísticas do banco:");
    console.log(`Total de itens: ${totalItems}`);
    console.log(`🎮 Jogos: ${gameCount}`);
    console.log(`📺 Animes: ${animeCount}`);
    console.log(`📚 Mangás: ${mangaCount}`);
  } catch (error) {
    console.error("💥 Erro durante a população:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o script
if (require.main === module) {
  populateDatabase();
}

export default populateDatabase;
