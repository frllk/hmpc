module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 不允许用console.
    // 'no-console': 'error', // 如果不遵守规则，就报错。
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    // // 强制在对象字面量的属性中键和值之间使用一致的间距
    // 'key-spacing': 'off',
    // // 不必要的;
    // semi: 'off' // 不需要去检测这个规则，如果不遵守这个规则也没事。
  }
}
