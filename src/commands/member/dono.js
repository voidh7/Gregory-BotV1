const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "dono",
  description: "Mostra informações sobre o dono.",
  commands: ["dono"],
  usage: `${PREFIX}dono`,

  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ socket, remoteJid, userJid, sendSuccessReact }) => {
    const username = userJid ? userJid.split("@")[0] : "usuário";

    const message = `
🔧 *Informações dos donos* 🔧

👨‍💻
voidh7
  _hacker e densenvolvedor de bots de zap_


  channel:https://whatsapp.com/channel/0029Vb8DlDL9MF95R8e8Px1o 
  github:https://github.com/voidh7/
  youtube:https://youtube.com/@void190y?si=kXgT6xLqVE5UbQL3 

  	


    `.trim();

    await sendSuccessReact();

    await socket.sendMessage(remoteJid, {
      text: message,
      mentions: [userJid],
    });
  },
}; 
