const path = require("path");

module.exports = (baseConfig, env, config) => {
    config.module.rules.push(
        {
            test: /\.(ts|tsx)$/,
            include: path.resolve(__dirname, "../src"),
            use: [
                require.resolve("ts-loader"),
                require.resolve("react-docgen-typescript-loader"),
            ],
        },
        {
            test: /\.less$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        localIdentName: "[name]-[local]-[hash:base64:4]",
                    }
                },
                'less-loader'
            ],
            include: /retail-ui/
        }
    );

    config.resolve.extensions.push(".ts", ".tsx");

    return config;
};