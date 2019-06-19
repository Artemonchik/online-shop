const path = require('path');
const APP_DIR = path.resolve('frontend/src');
const BUILD_DIR = path.resolve('frontend/public/dist');
const fs = require('fs');
module.exports = {
    mode: 'development',
    entry: APP_DIR + '/index.js',
    devtool: 'eval-source-map ',
    output: {
        path: BUILD_DIR,
        filename: "bundle.js"
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: APP_DIR,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            publicPath: './dist/images'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts',
                            publicPath: './dist/fonts'
                        }
                    }
                ]
            }
        ]
    }
};