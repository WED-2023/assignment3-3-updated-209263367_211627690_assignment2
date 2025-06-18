module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    // כללים מותאמים אישית (תוכל להוסיף או לשנות)
    'no-console': 'off',
    'no-debugger': 'off'
  }
}
