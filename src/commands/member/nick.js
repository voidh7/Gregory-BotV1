module.exports = {
  name: "nick",
  description: "Gera nicks exclusivos e estilizados",
  commands: ["nick", "gerarnick"],
  usage: "/nick <nome>",

  handle: async ({ args, socket, remoteJid, sendErrorReply }) => {
    if (!args[0]) return sendErrorReply(remoteJid, "Insira um nome para gerar seu nick.\nExemplo: /nick gebe");

    const nick = args.join(' ');

    // Estilos exclusivos dark/glitch/anime
    const estilosExclusivos = [
      `☢ ${nick} ☢`,
      `⚡︎彡${nick}彡⚡︎`,
      `☠︎${nick}☠︎`,
      `✖︎ ${nick} ✖︎`,
      `❂ ${nick} ❂`,
      `༒ ${nick} ༒`,
      `☬ ${nick} ☬`,
      `✦ ${nick} ✦`,
      `⛧︎${nick}⛧︎`,
      `⟁ ${nick} ⟁`,
      `⚔︎${nick}⚔︎`,
      `༺${nick}༻`,
      `☯︎ ${nick} ☯︎`,
      `✸ ${nick} ✸`,
      `❖ ${nick} ❖`,
      `🖤 ${nick} 🖤`,
      `♆ ${nick} ♆`,
      `☣ ${nick} ☣`,
      `✧ ${nick} ✧`,
      `☽ ${nick} ☾`,
      `⚛︎ ${nick} ⚛︎`,
      `☄ ${nick} ☄`,
      `✵ ${nick} ✵`,
      `⨀ ${nick} ⨀`,
      `☈ ${nick} ☈`,
      `༄ ${nick} ༄`,
      `⚡${nick}⚡`,
      `☯${nick}☯`,
      `✞${nick}✞`,
      `⛧ ${nick} ⛧`,
      `⚔️${nick}⚔️`,
      `☣︎${nick}☣︎`,
      `❖${nick}❖`,
      `✦${nick}✦`,
      `☢︎${nick}☢︎`,
    ];

    const resultado = `📝 *Nicks Exclusivos para:* _${nick}_\n\n${estilosExclusivos.join('\n')}`;

    await socket.sendMessage(remoteJid, { text: resultado });
  },
}; 
