const axios = require("axios");
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "cpf",
  description: "Consulta informações de um CPF",
  commands: ["cpf", "CPF"],
  usage: `${PREFIX}cpf <cpf>`,

  handle: async ({ args, socket, remoteJid, sendErrorReply }) => {
    const cpf = args[0];
    if (!cpf || cpf.length !== 11 || !/^\d+$/.test(cpf)) {
      return sendErrorReply("❌ CPF inválido. Envie 11 dígitos numéricos!\nExemplo:\n" + `${PREFIX}cpf 04819679902`);
    }

    try {
      const token = "povo"; // seu token fixo
      const { data } = await axios.get("https://yato-apis.shop/consultas/cpf", {
        params: { cpf, apitoken: token }
      });

      if (!data.status) {
        return sendErrorReply(`❌ ${data.resultado || "Consulta falhou"}`);
      }

      if (!data.dados || data.dados.status !== "success") {
        return sendErrorReply("⚠️ Dados não encontrados para este CPF.");
      }

      const d = data.dados;

      let message = `🧾 *Consulta CPF Realizada*\n\n`;
      message += `👤 *Nome:* ${d.nome}\n`;
      message += `🗓️ *Nascimento:* ${d.nasc}\n`;
      message += `👩‍👧 *Mãe:* ${d.nomeMae}\n`;
      message += `👨‍👦 *Pai:* ${d.nomePai}\n`;
      message += `🧬 *Sexo:* ${d.sexo}\n`;
      message += `🆔 *CPF:* ${d.cpf}\n\n`;
      message += `👨‍💻 *Criador:* ${data.criador || "Desconhecido"}`;

      await socket.sendMessage(remoteJid, { text: message });
    } catch (err) {
      console.error(err);
      sendErrorReply("❌ Erro interno na consulta do CPF.");
    }
  }
}; 
