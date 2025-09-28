const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "loja",
  description: "Mostra os itens disponíveis na loja.",
  commands: ["loja"],
  usage: `${PREFIX}loja`,

  handle: async ({ socket, remoteJid }) => {
    const lojaMsg = `
🏪 *LOJA DE ITENS* 🏪

🛡️ Escudo — 100 gold
   Protege contra *2 roubos*

🍵 Poção — 400 gold
   Recupera totalmente seu limite diário de mineração

🎲 DobrarChance — 200 gold
   Dobra as chances no cassino e minerações
`;

    await socket.sendMessage(remoteJid, { text: lojaMsg });
  }
}; 
