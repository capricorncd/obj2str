/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-13 17:39
 */
const { obj } = require('./test-obj')
const { obj2Str } = require('../dist/obj2str')

const str = obj2Str(obj, {
  // initSpaces: 4,
  // indentSpaces: 2,
  prefix: 'const obj = '
  // doubleQuotes: true
})

// console.log(JSON.stringify(obj, null, 4))
console.log(str)
console.log(obj2Str(obj.fn))
console.log(obj2Str(obj.fn2))
console.log(obj2Str(obj.arr))

console.log(obj2Str(function () {
  console.log('Hello world!')
}))
