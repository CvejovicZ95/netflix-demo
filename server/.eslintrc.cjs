module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest", // Promenjeno na konkretnu verziju ECMA
    sourceType: "module", // Promenjeno na script
  },
  settings: {
    node: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        // @ts-ignore
        paths: [__dirname],
      },
    },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
