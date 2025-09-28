const path = require("path");
const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "menugold",
  description: "Menu do sistema Gold no estilo do menu principal",
  commands: ["menugold", "goldmenu", "gmenu"],
  usage: `${PREFIX}menugold`,

  handle: async ({ socket, remoteJid, sendSuccessReact, sendImageFromFile }) => {
    const message = `
╭━━⪩ 💰 MENU GOLD 💰 ⪨━━
▢ • ⚜️ GGY BOT
▢ • ⚜️ by vøidh7 & justin 
╰━━─「✨」─━━

╭━━⪩ ⛏️COMANDOS⪨━━
▢ • ${PREFIX}minerar_gold
▢ • ${PREFIX}roubar @usuário
▢ • ${PREFIX}doargold @usuário
▢ • ${PREFIX}rankgold
▢ • ${PREFIX}cassino
▢ • ${PREFIX}gold
╰━━─「⭐」─━━

🎄 Canal oficial: https://whatsapp.com/channel/0029Vb8DlDL9MF95R8e8Px1o
`;

    await sendSuccessReact();

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "takeshi-bot.png"),
      message
    );
  },
}; 
