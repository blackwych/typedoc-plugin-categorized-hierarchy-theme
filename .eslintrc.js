module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'import/extensions': [2, {
      '.ts': 'never',
      '.tsx': 'never',
    }],
  },
};
