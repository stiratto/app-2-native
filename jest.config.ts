import type { Config } from "jest";

const config: Config = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
    "|@react-native" +
    "|@react-navigation" +
    ")/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;

