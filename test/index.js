/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-13 17:39
 */
const { obj } = require('./test-obj')
const { objToStr } = require('../dist/obj2str')


const str = objToStr(obj, {
  // initSpaces: 4,
  // indentSpaces: 2,
  prefix: 'const obj = ',
  // doubleQuotes: true
})

// console.log(JSON.stringify(obj, null, 4))
console.log(str)
