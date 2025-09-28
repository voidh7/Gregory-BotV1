/**
 * Menu do bot
 *
 * @author Dev Gui
 */
const { BOT_NAME, PREFIX } = require("./config");
const packageInfo = require("../package.json");
const { readMore } = require("./utils");
exports.menuMessage = () => {
  const date = new Date();

  return `╭━━⪩🔰BEM VINDO!🔰 ⪨━━${readMore()}
▢
▢ • ⚜️${BOT_NAME}
▢ • ⚜️Data: ${date.toLocaleDateString("pt-br")}
▢ • ⚜️Hora: ${date.toLocaleTimeString("pt-br")}
▢ • ⚜️Prefixo: ${PREFIX}
▢ •⚜️Versão: ${packageInfo.version}
▢ •⚜️donos:vøidh7 & justin
╰━━─「🪐」─━━

╭━━⪩ 🥋menus🥋 ⪨━━
▢ •💾 ${PREFIX}menugold
╰━━─「🌌」─━ 

╭━━⪩ ⚕️DONO⚕️ ⪨━━
▢ •✴️ ${PREFIX}get-id
▢ •✴️ ${PREFIX}off
▢ •✴️ ${PREFIX}on
▢ •✴️ ${PREFIX}menuTrava
▢ •✴️ ${PREFIX}avisoG
╰━━─「🌌」─━

╭━━⪩ 🧭puxadas🧭 ⪨━━
▢ •💠 ${PREFIX}cnpj
▢ •💠 ${PREFIX}ipinfo
▢ •💠 ${PREFIX}ddd
▢ •💠 ${PREFIX}infogithub
▢ •💠 ${PREFIX}cep
╰━━─「🪀」─━━ 

╭━━⪩ ❇️ADMINS❇️ ⪨━━
▢
▢ •💠 ${PREFIX}abrir
▢ •💠 ${PREFIX}agendar-mensagem
▢ •💠 ${PREFIX}anti-audio (1/0)
▢ •💠 ${PREFIX}anti-document (1/0)
▢ •💠 ${PREFIX}anti-event (1/0)
▢ •💠 ${PREFIX}anti-image (1/0)
▢ •💠 ${PREFIX}anti-link (1/0)
▢ •💠 ${PREFIX}anti-product (1/0)
▢ •💠 ${PREFIX}anti-sticker (1/0)
▢ •💠 ${PREFIX}anti-video (1/0)
▢ •💠 ${PREFIX}auto-responder (1/0)
▢ •💠 ${PREFIX}ban
▢ •💠 ${PREFIX}soAdmin (1/0)
▢ •💠 ${PREFIX}delete
▢ •💠 ${PREFIX}exit (1/0)
▢ •💠${PREFIX}fechar
▢ •💠 ${PREFIX}hidetag
▢ •💠 ${PREFIX}aviso
▢ •💠 ${PREFIX}limpar
▢ •💠 ${PREFIX}link-grupo
▢ •💠 ${PREFIX}mute
▢ •💠 ${PREFIX}only-admin (1/0)
▢ •💠 ${PREFIX}promover
▢ •💠 ${PREFIX}rebaixar
▢ •💠${PREFIX}revelar
▢ •💠 ${PREFIX}unmute
▢ •💠 ${PREFIX}banfake
▢ •💠 ${PREFIX}welcome (1/0)
▢
╰━━─「⭐」─━━

╭━━⪩ 🧑‍💻PRINCIPAL🧑‍💻 ⪨━━
▢ • 🌐${PREFIX}attp
▢ • 🌐${PREFIX}gerarCpf
▢ • 🌐${PREFIX}gerar-link
▢ • 🌐${PREFIX}get-lid
▢ • 🌐${PREFIX}infoGp
▢ • 🌐${PREFIX}google-search
▢ • 🌐${PREFIX}perfil
▢ • 🌐${PREFIX}ping
▢ • 🌐${PREFIX}raw-message
▢ • 🌐${PREFIX}rename
▢ • 🌐${PREFIX}sticker
▢ • 🌐${PREFIX}to-image
▢ • 🌐${PREFIX}ttp
▢ • 🌐${PREFIX}movie
▢ • 🌐${PREFIX}news
▢ • 🌐${PREFIX}cambio 
▢ • 🌐${PREFIX}yt-search
▢•  🌐${PREFIX}info
▢•  🌐${PREFIX}nick
▢•  🌐${PREFIX}frase
╰━━─「🚀」─━━

╭━━⪩ 👾DOWNLOADS👾 ⪨━━
▢
▢ • 🎁${PREFIX}play-audio
▢ • 🎁${PREFIX}play-video
▢ • 🎁${PREFIX}tik-tok
▢ • 🎁${PREFIX}yt-mp3
▢ • 🎁${PREFIX}yt-mp4
▢
╰━━─「🎶」─━━

╭━━⪩ 🎮BRINCADEIRAS🎮 ⪨━━
▢
▢ • 🕹️${PREFIX}abracar
▢ • 🕹️${PREFIX}beijar
▢ • 🕹️${PREFIX}dado
▢ • 🕹️${PREFIX}gostosa 
▢ • 🕹️${PREFIX}petista
▢ • 🕹️${PREFIX}bolsonarista
▢ • 🕹️${PREFIX}fiel
▢ • 🕹️${PREFIX}jantar
▢ • 🕹️${PREFIX}lutar
▢ • 🕹️${PREFIX}matar
▢ • 🕹️${PREFIX}socar
▢ • 🕹️${PREFIX}roletaRussa
▢ • 🕹️${PREFIX}comer 
▢ • 🕹️${PREFIX}pedir-namoro
▢ • 🕹️${PREFIX}infodonoGp
╰━━─「🎡」─━━
╭━━⪩ 🎖️IA🎖️ ⪨━━
▢
▢ • 🏆${PREFIX}gemini/ggy
▢ • 🏆${PREFIX}ia-sticker
▢ • 🏆${PREFIX}pixart
▢ • 🏆${PREFIX}stable-diffusion-turbo
▢
╰━━─「🚀」─━━

╭━━⪩ 🎃CANVAS🎃 ⪨━━
▢
▢ • 🎈${PREFIX}blur
▢ • 🎈${PREFIX}bolsonaro
▢ • 🎈${PREFIX}cadeia
▢ • 🎈${PREFIX}contraste
▢ • 🎈${PREFIX}espelhar
▢ • 🎈${PREFIX}gray
▢ • 🎈${PREFIX}inverter
▢ • 🎈${PREFIX}pixel
▢ • 🎈${PREFIX}rip
▢
╰━━─「❇」─━━
🎄bot channel
https://whatsapp.com/channel/0029Vb8DlDL9MF95R8e8Px1o

grupo oficial
https://chat.whatsapp.com/LZ2F6Ch5tG8DNayJrWF5IL?mode=ems_copy_t 

`;
}
