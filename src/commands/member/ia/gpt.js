const { PREFIX } = require(`${BASE_DIR}/config`);
const OpenAI = require("openai"); 
const yourKey = "sk-ijklmnopqrstuvwxijklmnopqrstuvwxijklmnop ";

module.exports = {
  name: "gpt",
  description: "use o GPT 5 mini pelo zapzap",
  commands: ["gpt", "gpt5"],
  usage: `${PREFIX}gpt <mensagem>`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendSucessReplay, args }) => {
    if (!args.length) return sendSucessReplay("❌ Você precisa escrever uma mensagem para o GPT.");

    const client = new OpenAI({ apiKey: yourKey });

    try {
      const response = await client.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
          { role: "system", content: "Você é um assistente técnico direto e objetivo." },
          { role: "user", content: args.join(" ") },
        ],
        temperature: 0.7,
      });

      const gptReply = response.choices[0].message.content;


      await sendSucessReplay(gptReply);

    } catch (err) {
      console.error("Erro ao chamar GPT:", err);
      sendSucessReplay("❌ Ocorreu um erro ao acessar o GPT.");
    }
  },
}; 
