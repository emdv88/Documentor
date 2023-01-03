var HtmlWebpackPlugin = require('html-webpack-plugin');
var InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

module.exports = function override(config, env) {
    // Assuming that the HtmlWebpackPlugin always comes first
    config.plugins[0].userOptions.inject = 'body'
    config.plugins.push(new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.\.js$/]))
    config.plugins.push(new MiniCssExtractPlugin())
    config.plugins.push(new HTMLInlineCSSWebpackPlugin())
    return config
}