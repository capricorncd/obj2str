# obj2str

object(Object, Function, Array) to string

<p align="left">
  <a href="https://npmcharts.com/compare/obj2str?minimal=true"><img src="https://img.shields.io/npm/dm/obj2str.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/obj2str"><img src="https://img.shields.io/npm/v/obj2str.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/obj2str"><img src="https://img.shields.io/npm/l/obj2str.svg?sanitize=true" alt="License"></a>
</p>

```shell script
npm i -S obj2str
# or
yarn add obj2str
```

## Usage

./test/index.js

```javascript
const { obj2str } = require('obj2str')

// test object
const obj = {
  a: 1111,
  b: 'fsdfs,d\'fsd',
  b2: 'this\'s an object',
  b3: `This's a test object`,
  212: 'xxdfdf',
  c: {
    cc: '3333',
    c2: 'sdfsf"d"fsd',
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

const str = obj2str(obj, {
  // initSpaces: 4,
  // indentSpaces: 4,
  prefix: 'const obj = ',
  // doubleQuotes: true,
  // keyQuote: true
})

console.log(str)
```

```shell
node ./test/index.js
```

print

```
const obj = {
    212: 'xxdfdf',
    a: 1111,
    b: 'fsdfs,d\'fsd',
    b2: 'this\'s an object',
    b3: 'This\'s a test object',
    c: {
        cc: '3333',
        c2: 'sdfsf"d"fsd',
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
```

## Methods

|Method|Parameters|Description|
|:--|:--|:--|
|obj2str|(o: any, options?: TypeOptions)|return `string`|

#### options

|Props|Type|Description|
|:--|:--|:--|
|initSpaces|`number`|Default indentation space for all lines, default: `0`|
|indentSpaces|`number`|Number of spaces to indent when formatting, default: `2`|
|prefix|`string`|Concatenation string prefix of the first line, default: `''`|
|doubleQuotes|`boolean`|Whether the string uses double quotes, default: `false`|
|keyQuote|`boolean`|Whether the key of the object uses quote, default: `false`|
