module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },

  extends: ['prettier'],
  // required to lint *.vue files
  plugins: ['prettier', 'html'],

  rules: {
    'prettier/prettier': ['error']
  }
};
