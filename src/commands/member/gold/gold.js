const { PREFIX } = require(`${BASE_DIR}/config`);
const { loadDB, getUser } = require("./goldSystem");

module.exports = {
  name: "gold",
  description: "Mostra quantos golds você tem.",
  commands: ["gold"],
  usage: `${PREFIX}gold`,

  handle: async ({ socket, remoteJid, userJid }) => {
    const db = loadDB();
    const userId = userJid.split("@")[0];
    const user = getUser(db, remoteJid, userId);

    await socket.sendMessage(remoteJid, {
      text: `💰 @${userId}, você tem ${user.gold} gold!`,
      mentions: [userJid]
    });
  }
}; 
