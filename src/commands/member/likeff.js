const axios = require("axios");
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "likeff",
  description: "Envia likes para um jogador de Free Fire.",
  commands: ["likeff", "Likeff", "Likesff", "likesff"],
  usage: `${PREFIX}likeff <id_do_jogador>`,

  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendErrorReply, sendReact, args }) => {
    if (!args.length) {
      return await sendErrorReply(`Exemplo de uso: ${PREFIX}likeff 12345678`);
    }

    const uid = encodeURIComponent(args[0]);
    const apiUrl = `https://world-ecletix.onrender.com/api/likesff?id=${uid}`;

    try {
      await sendReact("⏳");

      const startTime = Date.now();
      const { data } = await axios.get(apiUrl, { timeout: 10000 });
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

      // 1️⃣ Sistema em manutenção
      if (data.error && data.error === "Erro ao buscar informações do jogador.") {
        return await sendErrorReply("⚠️ O sistema de *LIKES* está em manutenção.\n⏳ Tente novamente mais tarde.");
      }

      // 2️⃣ ID inválido
      if (!data["ID do Jogador"]) {
        return await sendErrorReply("❌ Jogador não encontrado ou ID inválido.");
      }

      // 3️⃣ Já recebeu likes hoje
      if (String(data["Likes Enviados"]).startsWith("0")) {
        return await sendReply("⚠️ O jogador já recebeu likes hoje. Tente novamente em 24 horas.");
      }

      // 4️⃣ Sucesso
      const msg = `
❤️ *Likes enviados com sucesso!*

• 🆔 ID: ${data["ID do Jogador"]}
• ✨ Apelido: ${data["Apelido"]}
• 🌍 Região: ${data["Região"]}
• ⭐ Nível: ${data["Nível"]}
• 🔥 EXP: ${Number(data["Experiência"]).toLocaleString("pt-BR")}
• 👍 Likes Antes: ${Number(data["Likes Antes"]).toLocaleString("pt-BR")}
• 👍 Likes Depois: ${Number(data["Likes Depois"]).toLocaleString("pt-BR")}
• 📈 Likes Enviados: ${data["Likes Enviados"]}
⏱️ Tempo de resposta: ${elapsed} segundos
      `.trim();

      await sendReply(msg);
      await sendReact("✅");

    } catch (error) {
      console.error("Erro no likeff:", error.message);
      await sendErrorReply("🚨 Não foi possível buscar as informações de likes. Tente novamente mais tarde.");
    }
  },
}; 
