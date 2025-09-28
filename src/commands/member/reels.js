const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

module.exports = {
  name: "reel",
  description: "Baixa um Instagram Reel a partir de um link.",
  commands: ["reel"], // ✅ sempre array
  usage: `${PREFIX}reel <link>`,

  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ fullArgs, sendSuccessReply }) => {
    if (!fullArgs || fullArgs.length < 2) {
      throw new InvalidParameterError(
        "Você precisa fornecer o link de um Reel do Instagram."
      );
    }

    // pega o link do reel
    const args = Array.isArray(fullArgs)
      ? fullArgs.slice(1).join(" ")
      : fullArgs.toString().split(" ").slice(1).join(" ");
    const linky = args.trim();

    // salva dentro de uma pasta temporária
    const downloadsDir = path.resolve(__dirname, "../../downloads");
    if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir);

    const filename = `reel-${Date.now()}.mp4`;
    const filepath = path.join(downloadsDir, filename);

    // chama yt-dlp direto
    const child = spawn("yt-dlp", ["-f", "mp4", "-o", filepath, linky]);

    let stderr = "";
    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    await new Promise((resolve, reject) => {
      child.on("error", (err) => reject(err));
      child.on("close", (code) => {
        if (code !== 0) reject(new WarningError(`Erro ao baixar o Reel: ${stderr}`));
        else resolve();
      });
    });

    if (!fs.existsSync(filepath)) {
      throw new WarningError("O arquivo não foi gerado.");
    }

    await sendSuccessReply({
      video: { url: filepath },
      caption: "*Reel baixado com sucesso!*",
      contextInfo: {
        forwardingScore: 999999,
        isForwarded: true,
      },
    });

    // remove depois de enviado
    fs.unlink(filepath, (err) => {
      if (err) console.error("Erro ao deletar arquivo:", err);
    });
  },
};
