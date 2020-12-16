/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-13 17:39
 */
const { obj } = require('./test-obj')
const { obj2str } = require('../dist/obj2str')

const str = obj2str(obj, {
  // initSpaces: 4,
  // indentSpaces: 2,
  prefix: 'const obj = '
  // doubleQuotes: true
})

// console.log(JSON.stringify(obj, null, 4))
console.log(str)
console.log(obj2str(obj.fn))
console.log(obj2str(obj.fn2))
console.log(obj2str(obj.arr))

console.log(obj2str(function () {
  console.log('Hello world!')
}))
