const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

module.exports = {
    mode: "development",
    devtool: isDev ? "source-map" : false,
    entry: {
        app: "./index.tsx",
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[contenthash].js",
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendors",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },
    resolve: {
        extensions: [
            ".js",
            ".ts",
            ".tsx",
            ".json",
            ".png",
            ".jpg",
            ".jpeg",
            ".css",
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.ts(x?)/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                // [
                //     {
                //         loader: MiniCssExtractPlugin.loader,
                //         options: {
                //             hmr: isDev,
                //             reloadAll: true,
                //         },
                //     },
                //     "css-loader",
                // ], // use: ['style-loader', 'css-loader']  ПОСЛЕДОВАТЕЛЬНОСТЬ ВАЖНА!!! ЧИТАЕТСЯ СПРАВА НА ЛЕВО
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./build/[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css",
        }),
        new HtmlWebPackPlugin({
            filename: "../index.html",
            template: "./src/index.html",
            title: "Audio",
            minify: {
                collapseWhitespace: isProd,
            },
            excludeChunks: ["static"],
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/images"),
                    to: path.resolve(__dirname, "build/images"),
                },
            ],
        }),
    ],
};
