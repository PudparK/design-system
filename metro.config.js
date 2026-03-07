const { getDefaultConfig } = require("expo/metro-config");
const {
  withStorybook,
} = require("@storybook/react-native/metro/withStorybook");

const config = getDefaultConfig(__dirname);
const isProd = process.env.NODE_ENV === "production";
const storybookEnv = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED;
const storybookEnabled =
  storybookEnv === "true" ? true : storybookEnv === "false" ? false : !isProd;

module.exports = withStorybook(config, {
  // Keep this enabled in dev so /storybook route can resolve Storybook modules.
  // If disabled, Storybook can be stripped from the bundle and /storybook will break.
  enabled: storybookEnabled,
});
