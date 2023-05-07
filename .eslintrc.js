module.exports = {
  extends: [
    'next/core-web-vitals',
    'prettier', 
  ],
  rules: {
    'comma-dangle': [
      'error',
      'always-multiline', 
    ],
    semi: [
      'error',
      'always', 
    ],
    indent: [
      'error',
      2, 
    ],
    'array-element-newline': [ 
      "error",
      "consistent", 
    ],
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
      }, 
    ],
    'array-bracket-spacing': [
      'error',
      'always', 
    ],
    "object-curly-newline": [
      "error",
      {
        "consistent": true, 
      }, 
    ],
    'object-curly-spacing': [
      'error',
      'always', 
    ],
    'object-property-newline': 'error',
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      }, 
    ],
    'comma-style': [
      'error',
      'last', 
    ],
  },
};
