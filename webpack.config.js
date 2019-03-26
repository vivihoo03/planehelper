const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        index: path.join(__dirname, 'src/index.ts')
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: '[name].js'
    },
    module: {
        rules:[
            {
                test: /\.ts$/,
                exclude: [
                    path.join(__dirname, 'node_modules'),
                    path.join(__dirname, 'dist'),
                ],
                use: "ts-loader",
            }
        ] 
    },
    resolve: {
        extensions: ['.ts']
    },
    externals: {
        three: 'three',
    }
}