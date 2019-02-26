const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Css & JS minimization
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Image optimization
const ImageminPlugin = require("imagemin-webpack");
const imageminOptipng = require("imagemin-optipng");
const imageminJpegtran = require("imagemin-jpegtran");

// String replace
const properties = require('./src/properties.json');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const string_replacement_loader = StringReplacePlugin.replace({
    replacements: [{
        pattern: /\${([^\}]*)}/g,
        replacement: function(match, p1, offset, string) {
            return eval('properties.' + p1);
        }
    }]
});

module.exports = {
    entry: {
        app: './src/index.js',
        studio: './src/studio.js',
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Sonarworks Reference 4 Headphones Edition',
            chunks: ['app'],
            filename: 'headphones.html',
            template: './src/index.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Sonarworks Reference 4 Studio Edition',
            filename: 'studio.html',
            chunks: ['app','studio'],
            template: './src/studio.html',
        }),
        new StringReplacePlugin(),
        new ImageminPlugin({
            bail: false, // Ignore errors on corrupted images
            cache: true,
            imageminOptions: {
                // Lossless optimization with custom option
                // Feel free to experement with options for better result for you
                plugins: [
                    imageminOptipng({
                        optimizationLevel: 5
                    }),
                    imageminJpegtran({
                        progressive: true
                    }),
                ]
            }
        })
        // new BundleAnalyzerPlugin(),
    ],
    // output: {
    //     filename: '[name].bundle.js',
    //     path: path.resolve(__dirname, 'dist/how-it-works'),
    //     publicPath: 'how-it-works'
    // },
    externals: {
        jquery: 'jQuery'
    },
    module: {
        rules: [
        // {
        //         test: /\.s?css$/,
        //         use: [
        //             MiniCssExtractPlugin.loader,
        //             // {
        //             //     loader: 'style-loader', // inject CSS to page
        //             // }, 
        //             {
        //                 loader: 'css-loader', // translates CSS into CommonJS modules
        //             }, {
        //                 loader: 'postcss-loader', // Run post css actions
        //                 options: {
        //                     plugins: function() { // post css plugins, can be exported to postcss.config.js
        //                         return [
        //                             require('precss'),
        //                             require('autoprefixer')
        //                         ];
        //                     }
        //                 }
        //             }, {
        //                 loader: 'sass-loader' // compiles Sass to CSS
        //             }
        //         ]
        //     },
             {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options:{ outputPath: 'assets/images/' }
                }
                ]

            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    // ...The other file-loader and extract-loader go here.
                    {
                        loader: 'html-loader',
                        options: {
                            // THIS will resolve relative URLs to reference from the app/ directory
                            root: path.resolve(__dirname, 'app')
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loaders: [string_replacement_loader]
            },
        ]
    }

};