const axios = require("axios");
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "clima",
  description: "Consulta clima da cidade",
  commands: ["clima", "temperatura"],
  usage: `${PREFIX}clima <cidade>`,

  handle: async ({ args, socket, remoteJid, sendErrorReply }) => {
    const city = args[0];
    if (!city) return sendErrorReply("🙃 Você precisa fornecer uma cidade!");

    try {
      const { data } = await axios.get(`https://wttr.in/${city}?format=3`);
      if (!data || data.length === 0) return sendErrorReply("❌ Cidade não encontrada!");

      await socket.sendMessage(remoteJid, { text: data });
    } catch (err) {
      console.error(err);
      sendErrorReply("❌ Erro ao consultar o clima");
    }
  }
}; 
