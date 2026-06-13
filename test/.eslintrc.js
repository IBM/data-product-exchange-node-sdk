module.exports = {
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  rules: {
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'import/no-unresolved': ['error', { ignore: ['^../dist/'] }],
  },
};
