const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');

const prod = process.argv.indexOf('-p') !== -1;

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: ['react', 'react-dom', 'react-number-format', 'moment'],
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        pathinfo: true,
        publicPath: '/js/',
        filename: '[name].bundle.js',
        library: '[name]'
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-0']
                    }
                }],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: "file-loader?name=[name].[ext]&publicPath=/images/&outputPath=../images/"
            }
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        // new OpenBrowserPlugin({ url: 'http://localhost:3333' }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['app'],
            minChunks: Infinity
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
        new WebpackNotifierPlugin({title: 'Webpack', alwaysNotify: true}),
        new ExtractTextPlugin({
            filename: '../css/style.css',
            allChunks: true

        }),
        new webpack.ProvidePlugin({
            'React': 'react',
            'axios': 'axios',
            '_': 'lodash',
            'NumberFormat': 'react-number-format',
            'Select': 'react-select',
            'moment': 'moment',
        }),
    ]
};

if (prod) {
    module.exports.plugins.push(new webpack.EnvironmentPlugin({
        'process.env': {
            'NODE_ENV': `"production"`
        }
    }));
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
            screw_ie8: true,
            keep_fnames: true
        },
        compress: {
            screw_ie8: true
        },
        comments: false
    }))
} else {
    module.exports.devtool = 'source-map'
    module.exports.watch = true
    module.exports.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': `"dev"`,
            'SKINS_PORT': `"7000"`
        }
    }));
}