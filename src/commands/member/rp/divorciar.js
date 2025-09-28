const { loadFamiliaDB, saveFamiliaDB, getUser } = require("./utils");

module.exports = {
  name: "divorciar",
  description: "Divorce-se do parceiro",
  commands: ["divorciar"],
  usage: "/divorciar",
  handle: async ({ socket, remoteJid, userJid, message }) => {
    const db = loadFamiliaDB();
    const userId = userJid.split("@")[0];
    const user = getUser(db, userId);

    if (!user.parceiro) return socket.sendMessage(remoteJid, { text: "❌ Você não tem parceiro(a) para divorciar.", quoted: message });

    const parceiro = getUser(db, user.parceiro);
    parceiro.status = "solteiro";
    parceiro.parceiro = null;
    user.status = "solteiro";
    user.parceiro = null;
    saveFamiliaDB(db);

    socket.sendMessage(remoteJid, { text: `💔 @${userId} e @${parceiro} se divorciaram.`, mentions: [userJid, `${parceiro}@s.whatsapp.net`] });
  }
};
