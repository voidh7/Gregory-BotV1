const axios = require("axios");
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "cambio",
  description: "Consulta taxa de câmbio entre BRL, USD e EUR",
  commands: ["cambio", "exchange"],
  usage: `${PREFIX}cambio <moeda_origem> <moeda_destino>`,

  handle: async ({ args, socket, remoteJid, sendErrorReply }) => {
    const [from, to] = args.map(a => a.toUpperCase());
    if (!from || !to) return sendErrorReply("🙃 Use: <moeda_origem> <moeda_destino>");
    
    try {
      const { data } = await axios.get(`https://brasilapi.com.br/api/cambio/v1/${from}/${to}`);
      const message = `💱 Câmbio: ${from} → ${to}\n💰 Taxa: ${data.cotacaoCompra}`;
      await socket.sendMessage(remoteJid, { text: message });
    } catch (err) {
      console.error(err);
      sendErrorReply("❌ Erro ao consultar câmbio");
    }
  }
};
