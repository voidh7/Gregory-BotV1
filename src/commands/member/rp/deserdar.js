const { loadFamiliaDB, saveFamiliaDB, getUser } = require("./utils");

module.exports = {
  name: "deserdar",
  description: "Remover um filho da sua família",
  commands: ["deserdar"],
  usage: "/deserdar @usuario",
  handle: async ({ socket, remoteJid, userJid, args, message }) => {
    const db = loadFamiliaDB();
    const userId = userJid.split("@")[0];
    const user = getUser(db, userId);

    const targetId = args[0]?.replace("@", "");
    if (!targetId) return socket.sendMessage(remoteJid, { text: "💡 Use: /deserdar @usuario", quoted: message });

    const target = getUser(db, targetId);
    user.filhos = user.filhos.filter(f => f !== targetId);
    target.pais = target.pais.filter(p => p !== userId);
    saveFamiliaDB(db);

    socket.sendMessage(remoteJid, { text: `⚠️ @${userId} deserdou @${targetId}.`, mentions: [userJid, `${targetId}@s.whatsapp.net`] });
  }
};
