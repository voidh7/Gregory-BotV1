const dns = require("dns").promises;
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "dns",
  description: "Resolve DNS de um domínio",
  commands: ["Rdns"],
  usage: `${PREFIX}Rdns <dominio>`,

  /**
   * @param {commandsHandlePropros} param0
   */
  handle: async ({ args, socket, remoteJid, sendErrorReply }) => {
    const domain = args[0];
    if (!domain) return sendErrorReply("🙃 Você precisa fornecer um domínio!");

    try {
      const records = {};

      // Resolve todos os tipos principais de registro
      try { records.A = await dns.resolve4(domain); } catch {}
      try { records.AAAA = await dns.resolve6(domain); } catch {}
      try { records.MX = await dns.resolveMx(domain); } catch {}
      try { records.TXT = await dns.resolveTxt(domain); } catch {}
      try { records.CNAME = await dns.resolveCname(domain); } catch {}
      try { records.NS = await dns.resolveNs(domain); } catch {}

      let message = `🌐 DNS de ${domain}:\n\n`;
      for (let type in records) {
        if (records[type] && records[type].length > 0) {
          const value = Array.isArray(records[type][0]) ? records[type].map(r => r.join(" ")).join("\n") : records[type].join("\n");
          message += `*${type}:*\n${value}\n\n`;
        }
      }

      await socket.sendMessage(remoteJid, { text: message.trim() });
    } catch (err) {
      console.error(err);
      sendErrorReply("❌ Ocorreu um erro ao resolver o DNS");
    }
  }
}; 
