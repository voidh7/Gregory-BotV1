const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "familia.json");

function loadFamiliaDB() {
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify({}));
  return JSON.parse(fs.readFileSync(DB_PATH));
}

function saveFamiliaDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

function getUser(db, userId) {
  if (!db[userId]) {
    db[userId] = {
      status: "solteiro",
      parceiro: null,
      pais: [],
      filhos: []
    };
  }
  return db[userId];
}

module.exports = { loadFamiliaDB, saveFamiliaDB, getUser };
