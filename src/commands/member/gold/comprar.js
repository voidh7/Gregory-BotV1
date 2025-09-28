const { PREFIX } = require(`${BASE_DIR}/config`);
const { loadDB, saveDB, getUser } = require("./goldSystem");

const items = {
  escudo: 100,
  pocao: 400,
  dobrarChance: 200
};

module.exports = {
  name: "comprar",
  description: "Compre itens na loja com gold.",
  commands: ["comprar"],
  usage: `${PREFIX}comprar <item>`,

  handle: async ({ socket, remoteJid, userJid, args, message }) => {
    const db = loadDB();
    const userId = userJid.split("@")[0];
    const user = getUser(db, remoteJid, userId);

    const item = args[0];
    if (!item || !items[item])
      return socket.sendMessage(remoteJid, {
        text: `😳 e… uso correto: ${PREFIX}comprar <escudo|pocao|dobrarChance>`,
        mentions: [userJid],
        quoted: message
      });

    if (user.gold < items[item])
      return socket.sendMessage(remoteJid, {
        text: `😶 e… @${userId}, você não tem gold suficiente pra comprar ${item}…`,
        mentions: [userJid],
        quoted: message
      });

    user.gold -= items[item];
    if (!user.itens) user.itens = {};
    user.itens[item] = (user.itens[item] || 0) + 1;

    await socket.sendMessage(remoteJid, {
      text: `🙂 e… @${userId} comprou 1 ${item}… seu gold agora é ${user.gold}`,
      mentions: [userJid],
      quoted: message
    });

    saveDB(db);
  }
}; 
