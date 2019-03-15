const webpack = require("webpack"),
    path = require("path"),
    env = process.env.NODE_ENV

const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
    mode: env || 'development',
    optimization: {
        minimizer: env === 'production' ? [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            })
        ] : []
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                isProduction: env === 'production'
            }
        })
    ],
    entry: ["./src/index.js"],
    output: {
        filename: env === 'production' ? 'ttk-sdk.min.js' : 'ttk-sdk.js',
        path: path.join(__dirname, `/dist${env === 'production' ? '/release' : '/debug'}`),
        library: 'TTK',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: [".js"]
    },
    externals: {
        "react": {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        "react-dom": {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
        "redux": {
            root: 'Redux',
            commonjs2: 'redux',
            commonjs: 'redux',
            amd: 'redux'
        },
        "react-redux": {
            root: 'ReactRedux',
            commonjs2: 'react-redux',
            commonjs: 'react-redux',
            amd: 'react-redux'
        },
        "immutable": {
            root: 'Immutable',
            commonjs2: 'immutable',
            commonjs: 'immutable',
            amd: 'immutable'
        },
        "prop-types": {
            root: 'PropTypes',
            commonjs2: 'prop-types',
            commonjs: 'prop-types',
            amd: 'prop-types'
        }
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    }
}

