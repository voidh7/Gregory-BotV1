// nofap.js
const moment = require("moment-timezone");
const {PREFIX} = require(`${BASE_DIR}/config`)
module.exports = {
  name: "nofap",
  description: "Mostra a patente do Nofap setembro",
  commands: ["nofap"],
  usage: `${PREFIX}nofap`,
  handle: async ({ socket, remoteJid, info }) => {
    const datazinha = moment.tz("America/Sao_Paulo");
    const mes = datazinha.format("MM");
    const diaAtual = datazinha.date();

    if (mes !== "09") {
      await socket.sendMessage(remoteJid, {
        text: "❌ Não estamos em setembro (mês do Nofap). Mas isso não significa que você deve ir ver coisas 18+!"
      }, { quoted: info });
      return;
    }

    const inicio = moment("01/09/24", "DD/MM/YY");
    const dias = diaAtual - inicio.date() + 1;

    let patente = "Soldado 🇺🇦";
    if (dias >= 30) patente = "Monge ♾️";
    else if (dias === 29) patente = "Rei 👑";
    else if (dias === 28) patente = "General de Exército ⭐⭐⭐⭐⭐";
    else if (dias === 27) patente = "Coronel ⭐";
    else if (dias === 26) patente = "Major 🏅🏅🏅🏅🏅";
    else if (dias === 25) patente = "Capitão 🏅🏅🏅";
    else if (dias === 24) patente = "Primeiro Tenente 🏅🏅";
    else if (dias >= 21 && dias <= 23) patente = "Segundo Tenente 🏅";
    else if (dias >= 16 && dias <= 20) patente = "Aspirante a Oficial ⚜️⚜️";
    else if (dias >= 14 && dias <= 15) patente = "Subtenente ⚜️";
    else if (dias >= 11 && dias <= 13) patente = "Primeiro Sargento 🥇";
    else if (dias >= 6 && dias <= 10) patente = "Segundo Sargento 🥈";
    else if (dias >= 3 && dias <= 5) patente = "Terceiro Sargento 🥉";
    else if (dias === 2) patente = "Cabo 🎗️";

    await socket.sendMessage(remoteJid, {
      text: `*_Se você não se masturbou e nem acessou conteúdo 18+ desde 1 de setembro, sua patente agora é:_*\n\n*Patente:* *${patente}*`
    }, { quoted: info });
  }
}; 
