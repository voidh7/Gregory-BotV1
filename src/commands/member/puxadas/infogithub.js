const axios = require("axios");
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "infogithub",
  description: "Busca informações públicas de um usuário do GitHub, incluindo os 5 repositórios mais populares",
  commands: ["infogithub", "githubinfo"],
  usage: `${PREFIX}infogithub <usuario>`,

  handle: async ({ args, socket, remoteJid, sendErrorReply }) => {
    const username = args[0];
    if (!username) return sendErrorReply("🙃 Informe o nome do usuário do GitHub");

    try {
      // Pega dados do usuário
      const { data: user } = await axios.get(`https://api.github.com/users/${username}`);

      // Pega os repositórios do usuário e ordena por estrelas
      const { data: repos } = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
      const topRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);

      // Monta a mensagem
      let message = `🐙 GitHub Info de ${user.login}:\n\n`;
      message += `👤 Nome: ${user.name || "Não informado"}\n`;
      message += `🏢 Empresa: ${user.company || "Não informado"}\n`;
      message += `🌐 Website: ${user.blog || "Não informado"}\n`;
      message += `📍 Localização: ${user.location || "Não informado"}\n`;
      message += `📦 Repositórios públicos: ${user.public_repos}\n`;
      message += `👥 Seguidores: ${user.followers}\n`;
      message += `➡ Seguindo: ${user.following}\n`;
      message += `🖼 Avatar: ${user.avatar_url}\n`;
      message += `🔗 Perfil: ${user.html_url}\n\n`;

      if (topRepos.length > 0) {
        message += `⭐ Top 5 Repositórios:\n`;
        topRepos.forEach((r, i) => {
          message += `${i + 1}. ${r.name} (${r.stargazers_count}⭐)\n🔗 ${r.html_url}\n\n`;
        });
      }

      await socket.sendMessage(remoteJid, { text: message.trim() });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        sendErrorReply("❌ Usuário não encontrado");
      } else {
        console.error(err);
        sendErrorReply("❌ Erro ao buscar informações do GitHub");
      }
    }
  }
}; 
