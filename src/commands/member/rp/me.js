const { loadFamiliaDB, getUser } = require("./utils");

module.exports = {
  name: "me",
  description: "Mostra suas informações familiares",
  commands: ["me"],
  usage: "/me",
  handle: async ({ socket, remoteJid, userJid, message }) => {
    const db = loadFamiliaDB();
    const userId = userJid.split("@")[0];
    const user = getUser(db, userId);

    let text = `👤 @${userId}\nStatus: ${user.status}`;
    if (user.parceiro) text += `\nParceiro(a): @${user.parceiro}`;
    if (user.filhos.length) text += `\nFilhos: ${user.filhos.map(f => `@${f}`).join(", ")}`;
    if (user.pais.length) text += `\nPais: ${user.pais.map(p => `@${p}`).join(", ")}`;

    await socket.sendMessage(remoteJid, { text, mentions: [userJid, ...user.filhos.map(f => `${f}@s.whatsapp.net`), ...user.pais.map(p => `${p}@s.whatsapp.net`), ...(user.parceiro ? [`${user.parceiro}@s.whatsapp.net`] : [])], quoted: message });
  }
};
