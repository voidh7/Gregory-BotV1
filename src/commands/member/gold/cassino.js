const { PREFIX } = require(`${BASE_DIR}/config`);
const { loadDB, saveDB, getUser, resetIfNewDay } = require("./goldSystem");

const emojis = ["🍒", "🍋", "💎"];

module.exports = {
  name: "cassino",
  description: "Jogue na roleta do cassino! Máx. 5 vezes por dia.",
  commands: ["cassino"],
  usage: `${PREFIX}cassino <valor>`,

  handle: async ({ socket, remoteJid, userJid, args, message }) => {
    const db = loadDB();
    const today = new Date().toISOString().split("T")[0];
    const userId = userJid.split("@")[0];
    const user = getUser(db, remoteJid, userId);

    resetIfNewDay(user, today);
    if (!user.cassinoHoje) user.cassinoHoje = 0;
    if (user.cassinoHoje >= 5) {
      return socket.sendMessage(remoteJid, {
        text: `😳 e… @${userId}, você já jogou 5 vezes hoje… melhor descansar…`,
        mentions: [userJid],
        quoted: message
      });
    }

    const aposta = parseInt(args[0]);
    if (!aposta || aposta <= 0)
      return socket.sendMessage(remoteJid, {
        text: `💡 Uso correto: ${PREFIX}cassino <valor>`,
        mentions:[userJid],
        quoted: message
      });
    if (aposta > user.gold)
      return socket.sendMessage(remoteJid, {
        text: `😶 e… @${userId}, você não tem gold suficiente…`,
        mentions: [userJid],
        quoted: message
      });

    user.gold -= aposta;
    user.cassinoHoje++;

    const resultado = Array.from({ length: 3 }, () => emojis[Math.floor(Math.random() * emojis.length)]);

    const counts = {};
    resultado.forEach(e => counts[e] = (counts[e] || 0) + 1);
    const maxIgual = Math.max(...Object.values(counts));

    let multiplicador = 0;
    if (maxIgual === 3) multiplicador = 10;
    else if (maxIgual === 2) multiplicador = 2;

    const ganho = aposta * multiplicador;
    if (ganho > 0) user.gold += ganho;

    await socket.sendMessage(remoteJid, {
      text: `🎰 @${userId} girou a roleta!\n${resultado.join(" ")}\n${multiplicador > 0 ? `🎉 Ganhou ${ganho} gold!` : `😢 Perdeu ${aposta} gold...`}\n💰 Gold atual: ${user.gold}`,
      mentions: [userJid],
      quoted: message
    });

    saveDB(db);
  }
}; 
