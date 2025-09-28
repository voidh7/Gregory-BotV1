const { PREFIX } = require(`${BASE_DIR}/config`);
const { loadDB, saveDB, getUser, resetIfNewDay } = require("./goldSystem");

module.exports = {
  name: "roubar",
  description: "Tente roubar 20 gold de outro usuário (40% de chance, máx. 5 roubos/dia).",
  commands: ["roubar"],
  usage: `${PREFIX}roubar @usuario`,

  handle: async ({ socket, remoteJid, userJid, args }) => {
    const db = loadDB();
    const groupId = remoteJid;
    const userId = userJid.split("@")[0];
    const today = new Date().toISOString().split("T")[0];

    const user = getUser(db, groupId, userId);
    resetIfNewDay(user, today);

    const target = args[0]?.replace("@", "");
    if (!target) {
      return socket.sendMessage(remoteJid, { text: "Use: /roubar @usuario" });
    }
    const targetUser = getUser(db, groupId, target);

    if (user.roubosHoje >= 5) {
      return socket.sendMessage(remoteJid, { text: "🚫 Você já fez 5 roubos hoje." });
    }
    if (user.roubados.includes(target)) {
      return socket.sendMessage(remoteJid, { text: "🚫 Você já roubou esse usuário hoje." });
    }

    user.roubosHoje++;
    user.roubados.push(target);

    if (Math.random() < 0.4 && targetUser.gold >= 20) {
      user.gold += 20;
      targetUser.gold -= 20;
      await socket.sendMessage(remoteJid, {
        text: `🦹‍♂️ @${userId} roubou 20 gold de @${target}!`,
        mentions: [userJid, `${target}@s.whatsapp.net`]
      });
    } else {
      user.gold = Math.max(0, user.gold - 10);
      await socket.sendMessage(remoteJid, {
        text: `❌ @${userId} falhou no roubo e perdeu 10 gold!`,
        mentions: [userJid]
      });
    }

    saveDB(db);
  }
};
