const path = require("path");
const { PREFIX } = require(`${BASE_DIR}/config`);
const { loadDB, saveDB, getUser, resetIfNewDay } = require(path.join(__dirname, "goldSystem.js"));

module.exports = {
  name: "minerar_gold",
  description: "Tente minerar ouro (50% de chance, máx. 3x por dia).",
  commands: ["minerar_gold", "minerar"],
  usage: `${PREFIX}minerar_gold`,

  handle: async ({ socket, remoteJid, userJid, message }) => {
    const db = loadDB();
    const groupId = remoteJid;
    const userId = userJid.split("@")[0];
    const today = new Date().toISOString().split("T")[0];

    const user = getUser(db, groupId, userId);
    resetIfNewDay(user, today);

    // bônus do primeiro comando do dia
    if (!user.ganhouDaily) {
      user.gold += 20;
      user.ganhouDaily = true;
      await socket.sendMessage(remoteJid, {
        text: `😳 e… oi @${userId}… você ganhou 20 gold pelo primeiro comando do dia…`,
        mentions: [userJid],
        quoted: message
      });
    }

    if (!user.minerarHoje) user.minerarHoje = 0;
    if (user.minerarHoje >= 3) {
      return socket.sendMessage(remoteJid, {
        text: `😶 e… hm… @${userId}… você já minerou 3 vezes hoje… melhor descansar um pouquinho…`,
        mentions: [userJid],
        quoted: message
      });
    }

    user.minerarHoje++;

    if (Math.random() < 0.5) {
      user.gold += 20;
      await socket.sendMessage(remoteJid, {
        text: `🙂 e… hm… @${userId}… você encontrou 20 golds… boa…`,
        mentions: [userJid],
        quoted: message
      });
    } else {
      await socket.sendMessage(remoteJid, {
        text: `😶 e… hm… @${userId}… você minerou, mas… não encontrou nada… sinto muito…`,
        mentions: [userJid],
        quoted: message
      });
    }

    saveDB(db);
  }
}; 
