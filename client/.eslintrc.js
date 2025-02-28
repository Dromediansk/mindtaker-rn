module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "react-native"],
  rules: {
    "prettier/prettier": ["error", { trailingComma: "es5" }],
    "react-native/no-unused-styles": "error",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: ["client/tsconfig.json"],
      },
      node: {
        project: ["client/tsconfig.json"],
      },
    },
  },
};
