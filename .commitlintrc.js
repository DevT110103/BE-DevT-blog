module.exports = {
  extends: ['@commitlint/config-conventional', 'cz'],
  rules: {
    'header-pattern': [2, 'always', /^(update|add):\s{1}(.*)/i],
  },
};
