const axios = require("axios");
const xml2js = require("xml2js");
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "noticias",
  description: "Busca notícias recentes sem precisar de API Key",
  commands: ["noticias", "news"],
  usage: `${PREFIX}noticias <tema>`,

  handle: async ({ args, socket, remoteJid, sendErrorReply }) => {
    const query = args.join(" ");
    if (!query) return sendErrorReply("🙃 Informe um tema para buscar notícias");

    try {
      // Faz a requisição para o RSS do Google News filtrando pelo tema
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
      const response = await axios.get(url);
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(response.data);

      const articles = result.rss.channel[0].item.slice(0, 5); // pega até 5 notícias
      if (!articles || articles.length === 0) return sendErrorReply("❌ Nenhuma notícia encontrada");

      let message = `📰 Notícias sobre "${query}":\n\n`;
      articles.forEach((a, i) => {
        message += `${i + 1}. ${a.title[0]}\n🔗 ${a.link[0]}\n\n \n `
      }); 


      await socket.sendMessage(remoteJid, { text: message.trim() });
    } catch (err) {
      console.error(err);
      sendErrorReply("❌ Erro ao buscar notícias");
    }
  }
}; 
