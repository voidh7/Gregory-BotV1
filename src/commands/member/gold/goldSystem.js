const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "gold.json");

function loadDB() {
  if (!fs.existsSync(DB_PATH)) return {};
  return JSON.parse(fs.readFileSync(DB_PATH));
}

function saveDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

function getUser(db, groupId, userId) {
  if (!db[groupId]) db[groupId] = { usuarios: {} };
  if (!db[groupId].usuarios[userId]) {
    db[groupId].usuarios[userId] = {
      gold: 0,
      lastDaily: null,
      minerarHoje: 0,
      roubosHoje: 0,
      roubados: [],
      ganhouDaily: false
    };
  }
  return db[groupId].usuarios[userId];
}

function resetIfNewDay(user, today) {
  if (user.lastDaily !== today) {
    user.lastDaily = today;
    user.minerarHoje = 0;
    user.roubosHoje = 0;
    user.roubados = [];
    user.ganhouDaily = false;
  }
}

module.exports = { loadDB, saveDB, getUser, resetIfNewDay };
