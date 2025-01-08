const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const {
    wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = getDefaultConfig(__dirname);

const ALIASES = {
    'react-native-maps': '@teovilla/react-native-web-maps',
}

config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (platform === 'web') {
        // The alias will only be used when bundling for the web.
        return context.resolveRequest(context, ALIASES[moduleName] ?? moduleName, platform);
    }
    // Ensure you call the default resolver.
    return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(wrapWithReanimatedMetroConfig(config), { input: "./global.css" });