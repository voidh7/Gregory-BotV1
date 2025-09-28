const { PREFIX } = require(`${BASE_DIR}/config`);
const { loadDB, saveDB, getUser, resetIfNewDay } = require("./goldSystem");

module.exports = {
  name: "doargold",
  description: "Doe gold para outro usuário.",
  commands: ["doargold"],
  usage: `${PREFIX}doargold @usuario quantidade`,

  handle: async ({ socket, remoteJid, userJid, args }) => {
    const db = loadDB();
    const groupId = remoteJid;
    const userId = userJid.split("@")[0];
    const today = new Date().toISOString().split("T")[0];

    const user = getUser(db, groupId, userId);
    resetIfNewDay(user, today);

    const target = args[0]?.replace("@", "");
    const quantia = parseInt(args[1]);

    if (!target || isNaN(quantia) || quantia <= 0) {
      return socket.sendMessage(remoteJid, { text: "Use: /doargold @usuario quantidade" });
    }
    if (user.gold < quantia) {
      return socket.sendMessage(remoteJid, { text: "❌ Você não tem gold suficiente." });
    }

    const targetUser = getUser(db, groupId, target);
    user.gold -= quantia;
    targetUser.gold += quantia;

    await socket.sendMessage(remoteJid, {
      text: `🤝 @${userId} doou ${quantia} gold para @${target}!`,
      mentions: [userJid, `${target}@s.whatsapp.net`]
    });

    saveDB(db);
  }
};
