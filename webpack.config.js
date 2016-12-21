var path = require("path");
module.exports = {
    entry: {
        app: ["./src/entry/index.js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel', // 'babel-loader' is also a valid name to reference
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.html$/,
            loader: 'raw'
        }, {
            test: /\.css$/,
            loaders: [
                'style-loader',
                'css-loader'
            ]
        }]
    },
    resolve: {
        root: path.resolve(__dirname),
        alias: {
            app: path.resolve(__dirname) + '/src'
        }
    },
    target: 'electron-renderer',
    devtool: 'source-map'
};
