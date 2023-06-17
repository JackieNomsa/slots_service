const dbConfig = require("../database_config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.bllotog = require("./slot.model.js")(mongoose);

module.exports = db;