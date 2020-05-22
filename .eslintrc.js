module.exports = {
  extends: [
    'eslint-config-airbnb',
    'eslint-config-react',
    'prettier',
    'prettier/react'
  ],
  plugins: ['prettier'],
  rules: {
    'no-debugger': 'warn',
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/sort-comp': 'off',
    'react/no-unused-state': 'off',
    'react/prefer-stateless-function': 'off'
  },
  env: {
    browser: true
  },
  parser: 'babel-eslint'
};
