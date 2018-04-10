var path = require('path');
var webpack = require('webpack');

let name = 'index';
let isMini = process.env.npm_lifecycle_event === 'mini' ? true : false;
let entryName = isMini ? `${name}.min` : `${name}`;

module.exports = {
    entry: {
        [entryName]: './src/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'Calc',
        libraryTarget: 'umd'
    },

    devServer: {
        historyApiFallback: true,
        inline: true
    },

    externals: {
        jquery: {
           commonjs: 'jquery',
           commonjs2: 'jquery',
           amd: 'jquery',
           root: 'jQuery'
        }
    },

    module: {
        rules: [{ // es6
            test: /\.js$/,
            include: path.resolve(__dirname, './src/'),
            use: { loader: 'babel-loader', options: { presets: ['es2015', 'stage-0'] } }

        }]
    },

    plugins: isMini ? [new webpack.optimize.UglifyJsPlugin()] : []
}

