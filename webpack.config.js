const path = require('path')

const config = {
    entry: './src/index.js',
    output: {
        library: 'money2Text',
        filename: 'money2Text.js',
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'this',
        libraryTarget: 'umd',
        libraryExport: 'default',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
}

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.output.filename = 'money2Text.min.js'
    }
    return config
}
