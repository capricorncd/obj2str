/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-14 15:19
 */
const f = {
  number: 2000
}

const obj = {
  a: 1111,
  b: 'fsdfs,d\'fsd',
  b2: 'this\'s an object',
  b3: 'This\'s a test object',
  212: 'xxdfdf',
  c: {
    'brace-style': 0,
    '@typescript-eslint/no-use-before-define': 'off',
    cD: '3333',
    c_2: 'sdfsf"d"fsd',
    c3: {
      d: 2222
    }
  },
  k: null,
  f: undefined,
  g: 0,
  fn: function(str) {
    return str + 'hello world!'
  },
  fn2: (a) => a + 10,
  arr: [
    122,
    'xxx',
    {
      aa: 232434,
      bb: 'bb'
    },
    'dsfsdf'
  ]
}

module.exports = {
  obj
}
