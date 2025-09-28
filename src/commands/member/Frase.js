const {PREFIX,ASSETS_DIR} = require(`${BASE_DIR}/config`)
const path = require("path")

const imagePath = path.join(ASSETS_DIR,"images","frase.jpg")

const frases = [
  "A curiosidade é o pavio da descoberta.",
  "Nem todo bug é um erro. Às vezes, é uma feature.",
  "O silêncio também é resposta.",
  "Se for pra desistir, desista de ser fraco.",
  "Código limpo é poesia funcional.",
  "Enquanto eles dormem, eu compilo.",
  "O medo é um firewall mental.",
  "Persistência é o patch do fracasso.",
  "Você não falhou, só ainda não deu certo.",
  "Debugar é conversar com o passado.",
  "Toda linha de código carrega uma história.",
  "Quem domina o terminal, domina o sistema.",
  "Respira, recursa, refatora.",
  "O erro 404 não define seu valor.",
  "Caminhe como se fosse root."
];

module.exports={
  "name":"frase",
  descripition:"gera uma frase aleatória",
  commands:["frase"],
  usage:`${PREFIX}frase`,
  
      /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
 handle:async ({socket,sendImageFromFile})=>{
   let random = Math.floor(Math.random() * frases.length);
   let ramdomFrase = frases[random]
   
  await  sendImageFromFile(
   imagePath,
   `frase ${ramdomFrase}`
     )
 }  
   
}