const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "bin")
  }
};