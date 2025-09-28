const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const {
  activateOnlyAdmins,
  deactivateOnlyAdmins,
  isActiveOnlyAdmins,
} = require(`${BASE_DIR}/utils/database`);

module.exports = {
  name: "soAdmin",
  description: "Ativa ou desativa o recurso de somente admins usarem os comandos do bot.",
  commands: ["soAdmin", "onlyAdmin", "adminOnly"],
  usage: `${PREFIX}soAdmin (1/0)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError("Você precisa digitar 1 ou 0 (ligar ou desligar)!");
    }

    const enable = args[0] === "1";
    const disable = args[0] === "0";

    if (!enable && !disable) {
      throw new InvalidParameterError("Você precisa digitar 1 ou 0 (ligar ou desligar)!");
    }

    const alreadyEnabled = enable && isActiveOnlyAdmins(remoteJid);
    const alreadyDisabled = disable && !isActiveOnlyAdmins(remoteJid);

    if (alreadyEnabled || alreadyDisabled) {
      throw new WarningError(
        `O recurso de somente admins já está ${enable ? "ativado" : "desativado"}!`
      );
    }

    if (enable) {
      activateOnlyAdmins(remoteJid);
    } else {
      deactivateOnlyAdmins(remoteJid);
    }

    await sendSuccessReact();
    await sendReply(`Recurso de somente admins ${enable ? "ativado" : "desativado"} com sucesso!`);
  },
}; 
