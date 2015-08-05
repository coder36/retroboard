var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var webpack = require('webpack');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

console.log(TARGET);

var common = {
    entry: [path.resolve(ROOT_PATH, 'app/main')],
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel?stage=0'],
                include: path.resolve(ROOT_PATH, 'app')
            },
            { test: /\.woff$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Kanban app',
            template: 'app/my-index.html'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })

    ],
    externals: {
        "jquery": "jQuery"
    }
};

if(TARGET === 'prod') {
    module.exports = merge(common, {
        module: {
            loaders: [

            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    // This has effect on the react lib size
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                mangle: true,
                compress: {
                    warnings: false
                }
            })

        ]
    });
}

// loaders: ['babel', 'flowcheck', 'babel?stage=1&blacklist=flow&optional=es7.classProperties'],
if(TARGET === 'dev') {
    module.exports = merge(common, {
        entry: [
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/dev-server'
        ],
        module: {
            loaders: []
        }
    });
}