const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "info",
  description: "Mostra informações sobre o bot ou comando.",
  commands: ["info", "ajuda", "comando"],
  usage: `${PREFIX}info`,

  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ socket, remoteJid, userJid, sendSuccessReact }) => {
    const username = userJid ? userJid.split("@")[0] : "usuário";

    const message = `
🔧 *Informações do Bot* 🔧

👤 Usuário: @${username}
📜 Dono: voidh7
🤖 Bot: GGY Bot
💻versão:v1

📢 Canal:
https://whatsapp.com/channel/0029Vb8DlDL9MF95R8e8Px1o

🛠 digite /menu para mais


    `.trim();

    await sendSuccessReact();

    await socket.sendMessage(remoteJid, {
      text: message,
      mentions: [userJid],
    });
  },
};
