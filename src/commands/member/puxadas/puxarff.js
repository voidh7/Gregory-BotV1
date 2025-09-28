const axios = require("axios");
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "stalkff",
  description: "Consulta perfil e estatísticas de um jogador de Free Fire.",
  commands: ["stalkff", "Stalkff", "perfilff"],
  usage: `${PREFIX}stalkff <id_do_jogador>`,

  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendErrorReply, sendReact, args }) => {
    if (!args.length) {
      return await sendErrorReply(`Exemplo de uso: ${PREFIX}stalkff 486906394`);
    }

    const uid = encodeURIComponent(args[0]);
    const apiUrl = `https://yakuzastore.shop/apiff/stalkff2?id=${uid}`;

    try {
      await sendReact("⏳");

      const startTime = Date.now();
      const { data } = await axios.get(apiUrl, { timeout: 10000 });
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

      if (!data.sucesso) {
        return await sendErrorReply("❌ Não foi possível buscar o perfil. Verifique o ID.");
      }

      const info = data.info_perfil;
      const stats = data.estatisticas;

      const msg = `
✨ *Perfil Free Fire*

• 🆔 ID: ${data.id_perfil}
• 🎮 Apelido: ${info.apelido}
• ⭐ Nível: ${info.nivel}
• 🔥 EXP: ${Number(info.experiencia).toLocaleString("pt-BR")}
• 🌍 Região: ${info.regiao}
• 👍 Curtidas: ${Number(info.curtidas).toLocaleString("pt-BR")}
• 👑 Prime: ${info.status_prime}
• 🕓 Último login: ${info.ultimo_login}
• 📅 Conta criada: ${info.conta_criada}

📊 *Solo*
- Partidas: ${stats.solo.partidas}
- Vitórias: ${stats.solo.vitorias}
- Abates: ${stats.solo.abates}
- KDR: ${stats.solo.kdr}
- Headshots: ${stats.solo.taxa_headshots}%

📊 *Duo*
- Partidas: ${stats.duo.partidas}
- Vitórias: ${stats.duo.vitorias}
- Abates: ${stats.duo.abates}
- KDR: ${stats.duo.kdr}
- Headshots: ${stats.duo.taxa_headshots}%

📊 *Squad*
- Partidas: ${stats.squad.partidas}
- Vitórias: ${stats.squad.vitorias}
- Abates: ${stats.squad.abates}
- KDR: ${stats.squad.kdr}
- Headshots: ${stats.squad.taxa_headshots}%

⏱️ Tempo de resposta: ${elapsed} segundos
      `.trim();

      await sendReply(msg);
      await sendReact("✅");

    } catch (error) {
      console.error("Erro no stalkff:", error.message);
      await sendErrorReply("🚨 Não foi possível buscar o perfil. Tente novamente mais tarde.");
    }
  },
};
