module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/typescript",
    "prettier",
  ],
  env: {
    node: true,
  },
  rules: {
    "vue/html-self-closing": "off", // <div />のように単独で完結する要素を制限しない
    "no-unused-vars": "warn",
  },
}
