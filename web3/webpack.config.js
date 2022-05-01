const path = require("path");
// webpack needs to be explicitly required
const webpack = require('webpack')

module.exports = {
    entry: path.resolve(__dirname, "./src/index.ts"),
    output: {
        path: path.resolve(__dirname, "./dist")
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            experimentalWatchApi: true,
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
        alias: {
            process : "process/browser"
        },
        fallback: {
            "os" : false,
            "https" : false,
            "http" : false,
            "crypto" : false,
            "string_decoder" : false,
            "process" : false,
            "util" : false,
            "request" : false,
         //   "stream": require.resolve("stream-browserify"),
          //  "buffer": require.resolve("buffer"),
        },
    },
    plugins: [
    //     new webpack.DefinePlugin({
    //         process: 'process/browser',
    //     }),
    //     new webpack.ProvidePlugin({
    //         Buffer: ['buffer', 'Buffer'],
    //     }),
    //     new webpack.ProvidePlugin({
    //         process: 'process/browser',
    //     }),
    //       new webpack.DefinePlugin({
    // 'process.env.NODE_DEBUG': JSON.stringify(process.env.NODE_DEBUG)
    //       }),
    ],
    devServer : {
    }
}
