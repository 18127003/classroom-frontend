// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';



const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '../dist/',
        // filename: 'bundle.js',
        // environment: {
        //     arrowFunction: false,
        //     bigIntLiteral: false,
        //     const: false,
        //     destructuring: false,
        //     dynamicImport: false,
        //     forOf: false,
        //     module: false
        // }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
            favicon: path.join(__dirname, 'public', 'favicon.ico')
        })
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-env", ["@babel/preset-react",{runtime: 'automatic'}]],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/i,
                type: 'asset',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    }
                ] // ?name=[name].[ext] is only necessary to preserve the original file name
            }
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.js', '.ts','.jsx'],
        alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        },
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
    } else {
        config.mode = 'development';
        config.devtool = 'source-map';
    }
    return config;
};
