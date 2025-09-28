 const axios = require("axios");
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "cep",
  description: "Consulta informações de um CEP",
  commands: ["cep", "CEP"],
  usage: `${PREFIX}cep <cep>`,

  handle: async ({ args, socket, remoteJid, sendErrorReply }) => {
    const cep = args[0];
    if (!cep) return sendErrorReply("🙃 Você precisa fornecer um CEP!");

    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (data.erro) return sendErrorReply("❌ CEP não encontrado!");

      let message = `📌 CEP: ${cep}\n`;
      message += `🏠 Logradouro: ${data.logradouro}\n`;
      message += `🏘️ Bairro: ${data.bairro}\n`;
      message += `🌆 Cidade: ${data.localidade}\n`;
      message += `🏞️ Estado: ${data.uf}\n`;
      message += `📫 Complemento: ${data.complemento || "Nenhum"}\n`;

      await socket.sendMessage(remoteJid, { text: message });
    } catch (err) {
      console.error(err);
      sendErrorReply("❌ Erro ao consultar o CEP");
    }
  }
};
