module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        trailingComma: "all",
        arrowParens: "always",
      },
    ],
    "comma-dangle": ["warn", "only-multiline"],
  },
};
