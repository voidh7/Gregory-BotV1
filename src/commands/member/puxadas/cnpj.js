const axios = require("axios");
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "cnpj",
  description: "Consulta dados de uma empresa pelo CNPJ",
  commands: ["cnpj", "CNPJ"],
  usage: `${PREFIX}cnpj <cnpj>`,

  handle: async ({ args, socket, remoteJid, sendErrorReply }) => {
    const cnpj = args[0];
    if (!cnpj) return sendErrorReply("🙃 Você precisa fornecer um CNPJ!");

    try {
      const { data } = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
      if (data.status === "ERROR") return sendErrorReply(`❌ ${data.message}`);

      let message = `🏢 Nome: ${data.nome}\n`;
      message += `📛 Fantasia: ${data.fantasia}\n`;
      message += `🌐 Atividade: ${data.atividade_principal.map(a => a.text).join(", ")}\n`;
      message += `🏠 Endereço: ${data.logradouro}, ${data.numero} - ${data.bairro}, ${data.municipio} - ${data.uf}\n`;
      message += `📞 Telefone: ${data.telefone || "Nenhum"}\n`;

      await socket.sendMessage(remoteJid, { text: message });
    } catch (err) {
      console.error(err);
      sendErrorReply("❌ Erro ao consultar o CNPJ");
    }
  }
}; 
