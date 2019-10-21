const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const { name } = require("./package.json");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? `/${name}/` : "/",
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
  }
};
