const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.env.ENV === 'production'

module.exports = {
    entry: './src/index.tsx',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            hoistUseStatements: true,
                            resources: [
                                path.resolve(__dirname, 'src/vars.scss'),
                            ],
                        },
                    },
                ],
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    mode: isProduction ? 'production' : 'development',

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: process.env.PORT ?? 9000,
        hot: false,
        liveReload: false,
        client: false,
        historyApiFallback: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: true,
        }),
    ],

    devtool: 'source-map',

}
