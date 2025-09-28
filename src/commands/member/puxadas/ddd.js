const axios = require("axios");
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "ddd",
  description: "Consulta a cidade e estado por DDD",
  commands: ["ddd", "DDD"],
  usage: `${PREFIX}ddd <ddd>`,

  handle: async ({ args, socket, remoteJid, sendErrorReply }) => {
    const ddd = args[0];
    if (!ddd) return sendErrorReply("🙃 Você precisa fornecer um DDD!");

    try {
      const { data } = await axios.get(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);
      if (!data || data.length === 0) return sendErrorReply("❌ DDD não encontrado!");

      let message = `📞 DDD: ${ddd}\n`;
      message += `🏙️ Cidades: ${data.cities.join(", ")}\n`;
      message += `🌆 Estado: ${data.state}\n`;

      await socket.sendMessage(remoteJid, { text: message });
    } catch (err) {
      console.error(err);
      sendErrorReply("❌ Erro ao consultar o DDD");
    }
  }
}; 
