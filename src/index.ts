/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-13 17:23
 */
import { DEF_OPTIONS, NEW_LINE } from './constants'
import { TypeOptions, TypeObject, TypeFn } from '../types/index'
import { space, hasSpace, isObject, isFunction, isArray, isString } from './helper'

/**
 * handle string
 * @param str
 */
function handleString(str: string): string {
  return `'${str.replace(/'/g, '\\\'')}',`
}

/**
 * handle object
 * @param obj
 * @param keyQuote
 */
function handleObject(obj: TypeObject, keyQuote: boolean): string {
  const arr: string[] = ['{']
  let _key: string
  let temp: string
  Object.keys(obj).forEach(key => {
    _key = keyQuote || hasSpace(key) ? `'${key}'` : key
    temp = anyToStr(obj[key], keyQuote, `${_key}: `)
    arr.push(temp)
  })
  arr.push('}')
  return arr.join(NEW_LINE)
}

/**
 * any object to string
 * @param o
 * @param keyQuote
 * @param prefix
 */
function anyToStr(o: any, keyQuote: boolean, prefix: string = ''): string {
  let str: string
  if (isFunction(o)) {
    str = handleFunction(o)
  } else if (isObject(o)) {
    str = handleObject(o, keyQuote)
  } else if (isString(o)) {
    str = handleString(o)
  } else if (isArray(o)) {
    str = handleArray(o, keyQuote)
  } else {
    str = o + ','
  }
  return prefix + str
}

/**
 * handle function
 * @param fn
 */
function handleFunction(fn: TypeFn): string {
  return fn.toString() + ','
}

/**
 * handle array
 * @param arr
 * @param keyQuote
 */
function handleArray(arr: any[], keyQuote: boolean): string {
  const temp: string[] = arr.map(item => anyToStr(item, keyQuote))
  temp.unshift('[')
  temp.push(']')
  return temp.join(NEW_LINE)
}

/**
 * object to string
 * @param o
 * @param options
 */
function obj2str(o: any, options?: TypeOptions): string {
  const { prefix, initSpaces, indentSpaces, doubleQuotes, keyQuote } = { ...DEF_OPTIONS, ...options }
  let level = 0
  let str: string
  const initSpacesStr: string = space(initSpaces)
  const lines: string[] = anyToStr(o, keyQuote).split(NEW_LINE)
  const lastIndex: number = lines.length - 1
  const arr = lines.map((line, index) => {
    str = line.trim()

    // first line
    if (index === 0 && prefix) {
      str = prefix + str
    }

    // check object, array
    if (str.startsWith('}') || str.startsWith(']')) {
      level--
      if (level > 0 && !str.endsWith(',')) {
        str += ','
      }
    }
    str = space(level * indentSpaces) + str
    if (str.endsWith('{') || str.endsWith('[')) {
      level++
    }

    // special function code
    // fn2: function (a) { return a + a; }
    if (str.endsWith('}') && level > 0) {
      str += ','
    }

    // global indent
    if (initSpaces) {
      str = initSpacesStr + str
    }

    // Use double quotes
    if (doubleQuotes) {
      str = str.replace(/"/g, '\\"')
        .replace(/\\'/g, '__CACHE__')
        .replace(/'(.*?)'/g, '"$1"')
        .replace(/__CACHE__/g, "'")
    }

    // check ',' in the last line
    if (index === lastIndex && str.endsWith(',')) {
      str = str.substr(0, str.length - 1)
    }

    return str
  })
  return arr.join(NEW_LINE)
}

const objToStr = obj2str

export {
  objToStr,
  obj2str
}
