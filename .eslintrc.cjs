module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true,
  },
  extends: ["eslint:recommended", "plugin:node/recommended", "standard"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    semi: "off",
    quotes: ["error", "double"],
    "no-extra-semi": "error",
  },
  plugins: [],
};
