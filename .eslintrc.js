module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/typescript",
    "plugin:prettier/recommended",
    "prettier/vue",
    "prettier/@typescript-eslint",
  ],
  env: {
    node: true,
  },
  rules: {
    "vue/html-self-closing": "off", // <div />のように単独で完結する要素を制限しない
  },
};
