/**
 * Funções úteis para trabalhar
 * com dados.
 *
 * @author Dev Gui
 */
const path = require("node:path");
const fs = require("node:fs");

const databasePath = path.resolve(__dirname, "..", "..", "database");

const AUTO_RESPONDER_FILE = "auto-responder";
const AUTO_RESPONDER_GROUPS_FILE = "auto-responder-groups";
const ANTI_LINK_GROUPS_FILE = "anti-link-groups";
const EXIT_GROUPS_FILE = "exit-groups";
const GROUP_RESTRICTIONS_FILE = "group-restrictions";
const INACTIVE_GROUPS_FILE = "inactive-groups";
const MUTE_FILE = "muted";
const ONLY_ADMINS_FILE = "only-admins";
const RESTRICTED_MESSAGES_FILE = "restricted-messages";
const WELCOME_GROUPS_FILE = "welcome-groups";

function createIfNotExists(fullPath, formatIfNotExists = []) {
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, JSON.stringify(formatIfNotExists));
  }
}

function readJSON(jsonFile, formatIfNotExists = []) {
  const fullPath = path.resolve(databasePath, `${jsonFile}.json`);

  createIfNotExists(fullPath, formatIfNotExists);

  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function writeJSON(jsonFile, data, formatIfNotExists = []) {
  const fullPath = path.resolve(databasePath, `${jsonFile}.json`);

  createIfNotExists(fullPath, formatIfNotExists);

  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), "utf8");
}

exports.activateExitGroup = (groupId) => {
  const filename = EXIT_GROUPS_FILE;

  const exitGroups = readJSON(filename);

  if (!exitGroups.includes(groupId)) {
    exitGroups.push(groupId);
  }

  writeJSON(filename, exitGroups);
};

exports.deactivateExitGroup = (groupId) => {
  const filename = EXIT_GROUPS_FILE;

  const exitGroups = readJSON(filename);

  const index = exitGroups.indexOf(groupId);

  if (index === -1) {
    return;
  }

  exitGroups.splice(index, 1);

  writeJSON(filename, exitGroups);
};

exports.isActiveExitGroup = (groupId) => {
  const filename = EXIT_GROUPS_FILE;

  const exitGroups = readJSON(filename);

  return exitGroups.includes(groupId);
};

exports.activateWelcomeGroup = (groupId) => {
  const filename = WELCOME_GROUPS_FILE;

  const welcomeGroups = readJSON(filename);

  if (!welcomeGroups.includes(groupId)) {
    welcomeGroups.push(groupId);
  }

  writeJSON(filename, welcomeGroups);
};

exports.deactivateWelcomeGroup = (groupId) => {
  const filename = WELCOME_GROUPS_FILE;

  const welcomeGroups = readJSON(filename);

  const index = welcomeGroups.indexOf(groupId);

  if (index === -1) {
    return;
  }

  welcomeGroups.splice(index, 1);

  writeJSON(filename, welcomeGroups);
};

exports.isActiveWelcomeGroup = (groupId) => {
  const filename = WELCOME_GROUPS_FILE;

  const welcomeGroups = readJSON(filename);

  return welcomeGroups.includes(groupId);
};

exports.activateGroup = (groupId) => {
  const filename = INACTIVE_GROUPS_FILE;

  const inactiveGroups = readJSON(filename);

  const index = inactiveGroups.indexOf(groupId);

  if (index === -1) {
    return;
  }

  inactiveGroups.splice(index, 1);

  writeJSON(filename, inactiveGroups);
};

exports.deactivateGroup = (groupId) => {
  const filename = INACTIVE_GROUPS_FILE;

  const inactiveGroups = readJSON(filename);

  if (!inactiveGroups.includes(groupId)) {
    inactiveGroups.push(groupId);
  }

  writeJSON(filename, inactiveGroups);
};

exports.isActiveGroup = (groupId) => {
  const filename = INACTIVE_GROUPS_FILE;

  const inactiveGroups = readJSON(filename);

  return !inactiveGroups.includes(groupId);
};

exports.getAutoResponderResponse = (match) => {
  const filename = AUTO_RESPONDER_FILE;

  const responses = readJSON(filename);

  const matchUpperCase = match.toLocaleUpperCase();

  const data = responses.find(
    (response) => response.match.toLocaleUpperCase() === matchUpperCase
  );

  if (!data) {
    return null;
  }

  return data.answer;
};

exports.activateAutoResponderGroup = (groupId) => {
  const filename = AUTO_RESPONDER_GROUPS_FILE;

  const autoResponderGroups = readJSON(filename);

  if (!autoResponderGroups.includes(groupId)) {
    autoResponderGroups.push(groupId);
  }

  writeJSON(filename, autoResponderGroups);
};

exports.deactivateAutoResponderGroup = (groupId) => {
  const filename = AUTO_RESPONDER_GROUPS_FILE;

  const autoResponderGroups = readJSON(filename);

  const index = autoResponderGroups.indexOf(groupId);

  if (index === -1) {
    return;
  }

  autoResponderGroups.splice(index, 1);

  writeJSON(filename, autoResponderGroups);
};

exports.isActiveAutoResponderGroup = (groupId) => {
  const filename = AUTO_RESPONDER_GROUPS_FILE;

  const autoResponderGroups = readJSON(filename);

  return autoResponderGroups.includes(groupId);
};

exports.activateAntiLinkGroup = (groupId) => {
  const filename = ANTI_LINK_GROUPS_FILE;

  const antiLinkGroups = readJSON(filename);

  if (!antiLinkGroups.includes(groupId)) {
    antiLinkGroups.push(groupId);
  }

  writeJSON(filename, antiLinkGroups);
};

exports.deactivateAntiLinkGroup = (groupId) => {
  const filename = ANTI_LINK_GROUPS_FILE;

  const antiLinkGroups = readJSON(filename);

  const index = antiLinkGroups.indexOf(groupId);

  if (index === -1) {
    return;
  }

  antiLinkGroups.splice(index, 1);

  writeJSON(filename, antiLinkGroups);
};

exports.isActiveAntiLinkGroup = (groupId) => {
  const filename = ANTI_LINK_GROUPS_FILE;

  const antiLinkGroups = readJSON(filename);

  return antiLinkGroups.includes(groupId);
};

exports.muteMember = (groupId, memberId) => {
  const filename = MUTE_FILE;

  const mutedMembers = readJSON(filename, JSON.stringify({}));

  if (!mutedMembers[groupId]) {
    mutedMembers[groupId] = [];
  }

  if (!mutedMembers[groupId]?.includes(memberId)) {
    mutedMembers[groupId].push(memberId);
  }

  writeJSON(filename, mutedMembers);
};

exports.unmuteMember = (groupId, memberId) => {
  const filename = MUTE_FILE;

  const mutedMembers = readJSON(filename, JSON.stringify({}));

  if (!mutedMembers[groupId]) {
    return;
  }

  const index = mutedMembers[groupId].indexOf(memberId);

  if (index !== -1) {
    mutedMembers[groupId].splice(index, 1);
  }

  writeJSON(filename, mutedMembers);
};

exports.checkIfMemberIsMuted = (groupId, memberId) => {
  const filename = MUTE_FILE;

  const mutedMembers = readJSON(filename, JSON.stringify({}));

  if (!mutedMembers[groupId]) {
    return false;
  }

  return mutedMembers[groupId]?.includes(memberId);
};

exports.activateOnlyAdmins = (groupId) => {
  const filename = ONLY_ADMINS_FILE;

  const onlyAdminsGroups = readJSON(filename, []);

  if (!onlyAdminsGroups.includes(groupId)) {
    onlyAdminsGroups.push(groupId);
  }

  writeJSON(filename, onlyAdminsGroups);
};

exports.deactivateOnlyAdmins = (groupId) => {
  const filename = ONLY_ADMINS_FILE;

  const onlyAdminsGroups = readJSON(filename, []);

  const index = onlyAdminsGroups.indexOf(groupId);
  if (index === -1) {
    return;
  }

  onlyAdminsGroups.splice(index, 1);

  writeJSON(filename, onlyAdminsGroups);
};

exports.isActiveOnlyAdmins = (groupId) => {
  const filename = ONLY_ADMINS_FILE;

  const onlyAdminsGroups = readJSON(filename, []);

  return onlyAdminsGroups.includes(groupId);
};

exports.readGroupRestrictions = () => {
  return readJSON(GROUP_RESTRICTIONS_FILE, {});
};

exports.saveGroupRestrictions = (restrictions) => {
  writeJSON(GROUP_RESTRICTIONS_FILE, restrictions, {});
};

exports.isActiveGroupRestriction = (groupId, restriction) => {
  const restrictions = exports.readGroupRestrictions();

  if (!restrictions[groupId]) {
    return false;
  }

  return restrictions[groupId][restriction] === true;
};

exports.updateIsActiveGroupRestriction = (groupId, restriction, isActive) => {
  const restrictions = exports.readGroupRestrictions();

  if (!restrictions[groupId]) {
    restrictions[groupId] = {};
  }

  restrictions[groupId][restriction] = isActive;

  exports.saveGroupRestrictions(restrictions);
};



exports.readRestrictedMessageTypes = () => {
  return readJSON(RESTRICTED_MESSAGES_FILE, {
    sticker: "stickerMessage",
    video: "videoMessage",
    image: "imageMessage",
    audio: "audioMessage",
    product: "productMessage",
    document: "documentMessage",
    event: "eventMessage",
  });
};

