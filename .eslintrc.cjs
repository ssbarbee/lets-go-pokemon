module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/query/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react",
    "react-refresh",
    "@typescript-eslint",
    "import",
    "unused-imports"
  ],
  rules: {
    "react/jsx-boolean-value": ["error", "always"],
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
        js: "never",
        jsx: "never",
      },
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { vars: "all", varsIgnorePattern: "^_", argsIgnorePattern: "^_" }
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};