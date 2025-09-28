const whoiser = require("whoiser");
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "whois",
  description: "Consulta WHOIS com dados detalhados",
  commands: ["whois"],
  usage: `${PREFIX}whois dominio.com`,

  /**
   * @param {commandsHandlePropros} param0
   */
  handle: async ({ args, sendReply }) => {
    const dominio = args[0];
    if (!dominio || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(dominio)) {
      return sendReply("❌ Domínio inválido.\nExemplo: " + PREFIX + "whois google.com");
    }

    try {
      const resultado = await whoiser(dominio);
      const info = resultado["whois.verisign-grs.com"] || resultado[Object.keys(resultado)[0]] || resultado;

      const registrar = info.registrar || info["Registrar"] || "?";
      const status = info.status || info["Status"] || "?";
      const creationDate = info.creationDate || info.createdDate || "?";
      const expiryDate = info.registryExpiryDate || info.expires || "?";
      const nameServers = info.nameServer || info.nameServers || [];

      const resposta = `
🤖 🌐 WHOIS de *${dominio}*

• Registrar: ${registrar}
• Status: ${status}
• Criado em: ${creationDate}
• Expira em: ${expiryDate}
• Servidores DNS: ${nameServers.length ? nameServers.join(", ") : "?"}
      `.trim();

      sendReply(resposta);
    } catch (err) {
      sendReply("❌ Erro ao consultar WHOIS.\n" + (err.message || err.toString()));
    }
  },
};