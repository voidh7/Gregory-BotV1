
module.exports = {
  name: "prefixo",
  description: "mostra o prefixo do bot",
  commands: ["prefixo"],
  usage: `prefixo`,

  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ socket, remoteJid, userJid, sendSuccessReact }) => {
    const username = userJid ? userJid.split("@")[0] : "usuário";

    const message = `
ᓬ(•ᴗ•)ᕒ  eai beleza? 
\n
😺meu prefixo e [/]

    `.trim();

    await sendSuccessReact();
	
    await socket.sendMessage(remoteJid, {
      text: message,
      mentions: [userJid],
    });
  },
}; 
