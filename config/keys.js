const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  mongoURI: process.env.MONGOURI || "mongodb://localhost:27017/shopping_list",
};
