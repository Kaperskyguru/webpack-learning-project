// const webpack = require('webpack')
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const glob = require('glob');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CustomManifestPlugin = require('./src/js/plugins/WebpackCustomManifestPlugin')

const env = process.env.NODE_ENV;

module.exports = {
    mode: env == 'production' || env == 'none' ? env : 'development',
    entry: {
        app: [path.resolve(__dirname + '/src/js/app.js'), path.resolve(__dirname + '/src/scss/app.scss')],
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'assets/js/[name]-[contenthash].js',
    },

    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [require('precss'), require('autoprefixer')];
                            }
                        }
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: 'assets/images/[hash]-[name].[ext]',
                    }
                }]
            }

        ]
    },
    plugins: [

        new MiniCssExtractPlugin({
            filename: 'assets/css/[name]-[contenthash].css',
        }),

        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                presets: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }]
            }
        }),

        new CustomManifestPlugin({
            outputPath: path.resolve(__dirname + '/')
        }),

        new HtmlPlugin({
            filename: 'index.html',
            minify: env === 'production' ? {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            } : false,
            template: 'src/index.html'
        }),



    ],
    optimization: {
        minimizer: []
    }

};

if (env === 'production') {
    module.exports.plugins.push(
        new PurgeCssPlugin({
            paths: glob.sync(path.join(__dirname, 'src') + '/**/*', {
                nodir: true
            })
        })
    );
}