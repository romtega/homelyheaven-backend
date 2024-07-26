module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "standard",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    semi: "off",
    quotes: ["error", "double"],
    "no-extra-semi": "error",
    "import/no-unresolved": "off",
    "import/export": "off",
    "comma-dangle": ["error", "never"],
  },
  plugins: ["import"],
};
