const axios = require("axios");
const { isGroup } = require(`${BASE_DIR}/utils`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "localizar",
  description: "Localiza informações de um IP",
  commands: ["localizar", "ipinfo"],
  usage: "localizar <IP>",
  handle: async ({
    args,
    socket,
    remoteJid,
    userJid,
    sendErrorReply,
    sendWaitReply,
    sendSuccessReact,
  }) => {
    if (!args[0]) {
      await sendErrorReply("📌 Por favor, envie um IP para localizar. Exemplo: `localizar 8.8.8.8`");
      return;
    }

    const ip = args[0];

    await sendWaitReply("🔍 Buscando informações do IP...");

    try {
      const res = await axios.get(`http://ip-api.com/json/${ip}`);
      const data = res.data;

      if (data.status !== "success") {
        await sendErrorReply("❌ Não consegui localizar esse IP. Verifique se está correto.");
        return;
      }

      const resposta = `
╭━━━📍 *Localização do IP* ━━━╮
┃ 🌐 *IP:* ${data.query}
┃ 🌍 *País:* ${data.country} (${data.countryCode})
┃ 🏙️ *Cidade:* ${data.city}
┃ 🧭  *estado:* ${data.regionName}
┃ ⚜️  *cep:* ${data.zip}
┃ 🤟 *Latitude:* ${data.lat}
┃ 🀄 *Longitude:* ${data.lon}
┃ 📡 *Provedor:* ${data.isp}

┃ 🕒 *Fuso horário:* ${data.timezone}
┃ 🌎 *google maps:*  https://www.google.com/maps?q=${data.lat},${data.lon}
╰━━━━━━━━━━━━━━━━━━━━━━━╯
✅ *Status:* Localização obtida com sucesso
      
> by GGY BOT	
	    `.trim();

      await sendSuccessReact();

      await socket.sendMessage(remoteJid, { text: resposta });
    } catch (error) {
      console.error("[LOCALIZAR ERRO]", error);
      await sendErrorReply("❌ Ocorreu um erro ao tentar localizar o IP.");
    }
  },
};
