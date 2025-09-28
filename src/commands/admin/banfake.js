const { PREFIX } = require(`${BASE_DIR}/config`);

// DDIs de países lusófonos
const LUSOFONOS = ["351", "55", "244", "258", "238", "245", "239", "670"];

module.exports = {
  name: "banfake",
  description: "Remove todos os membros que NÃO são de países lusófonos.",
  commands: ["banfake"],
  usage: `${PREFIX}banfake`,

  handle: async ({ socket, remoteJid }) => {
    try {
      // 1️⃣ Pega os participantes do grupo
      const groupMeta = await socket.groupMetadata(remoteJid);
      const members = groupMeta.participants;

      // 2️⃣ Filtra membros que NÃO são lusófonos
      const naoLusofonos = members
        .map(m => m.id)
        .filter(jid => {
          const numero = jid.split("@")[0]; // tira @s.whatsapp.net
          return !LUSOFONOS.some(code => numero.startsWith(code));
        });

      if (naoLusofonos.length === 0) {
        return socket.sendMessage(remoteJid, { text: "✅ Todos os membros já são lusófonos." });
      }

      // 3️⃣ Remove os não-lusófonos do grupo
      await socket.groupParticipantsUpdate(remoteJid, naoLusofonos, "remove");

      // 4️⃣ Confirmação
      socket.sendMessage(remoteJid, { text: `🚫 Removidos ${naoLusofonos.length} membros de países não lusófonos.` });

    } catch (err) {
      console.error(err);
      socket.sendMessage(remoteJid, { text: "❌ Erro ao executar /banfake." });
    }
  }
}; 
