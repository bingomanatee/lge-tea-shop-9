module.exports = {
  options: {
    root: __dirname
  },
  use: [
    ['@neutrinojs/airbnb',
      {
        ignore: ['src/lib/gatekeeper/'],
        eslint: {
          'rules': {
            'react/prefer-stateless-function': 0,
            'react/destructuring-assignment': 0,
            'jsx-a11y/anchor-is-valid': 0,
            'no-unused-vars': 0,
            'jest/no-disabled-tests': 0,
            'no-underscore-dangle': 0,
            'no-console': 0,
            'func-names': 0,
            'jsx-a11y/click-events-have-key-events': 0,
            'react/jsx-in-scope': 0,
            'prefer-destructuring': 0,
            'class-methods-use-this': 0,
            'react/prop-types': [0, {ignore: ['children']}],
          }
        }
      }],
    [
      '@neutrinojs/react',
      {
        devServer: {
          disableHostCheck: true,
        },
        html: {
          title: 'tea-shop',
          template: 'template.ejs',
        }
      }
    ],
    ['@neutrinojs/copy', {
      patterns: [{
        from: '**/*',
        to: '',
        context: __dirname + '/src/static/'
      }, {
        from: '**/*.css',
        to: 'css',
        context: __dirname + '/src/css/'
      }]
    }],
    '@neutrinojs/jest'
  ]
};
