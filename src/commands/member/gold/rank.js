const { PREFIX } = require(`${BASE_DIR}/config`);
const { loadDB } = require("./goldSystem");

module.exports = {
  name: "rankgold",
  description: "Mostra o ranking de gold do grupo.",
  commands: ["rankgold"],
  usage: `${PREFIX}rankgold`,

  handle: async ({ socket, remoteJid }) => {
    const db = loadDB();
    const groupId = remoteJid;

    if (!db[groupId] || !Object.keys(db[groupId].usuarios).length) {
      return socket.sendMessage(remoteJid, { text: "🏆 Ninguém tem gold ainda no grupo." });
    }

    const ranking = Object.entries(db[groupId].usuarios)
      .map(([id, data]) => ({ id, gold: data.gold }))
      .sort((a, b) => b.gold - a.gold)
      .slice(0, 10);

    let msg = "🏆 *Ranking de Gold* 🏆\n\n";
    ranking.forEach((u, i) => {
      msg += `${i + 1}. @${u.id} → ${u.gold} gold\n`;
    });

    await socket.sendMessage(remoteJid, {
      text: msg,
      mentions: ranking.map(u => `${u.id}@s.whatsapp.net`)
    });
  }
};
