/*
BZcore.js
Lib criada para simplificar o uso do baileys

Autor: void
Licença: MIT
*/

async function sendMsg(socket, remoteJid, msg) {
  if (!socket || !remoteJid || !msg) throw new Error("Parâmetros obrigatórios faltando");
  return await socket.sendMessage(remoteJid, { text: msg });
}

async function sendImg(socket,remoteJid,buffer,caption){
  return  await  socket.sendMessage(remoteJid,{
    image:buffer,
    caption:caption,
    
  })
}


module.exports = sendMsg;