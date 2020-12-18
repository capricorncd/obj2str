/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-13 17:23
 */
import { DEF_OPTIONS, NEW_LINE } from './constants'
import { TypeOptions, TypeObject, TypeFn } from '../types/index'
import { space, hasSpecialCharacters, isObject, isFunction, isArray, isString } from './helper'

/**
 * handle string
 * @param str
 */
function handleString(str: string): string {
  return `'${str.replace(/'/g, '\\\'')}'`
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
  const keys: string[] = Object.keys(obj)
  const lastIndex: number = keys.length - 1
  keys.forEach((key, index) => {
    _key = keyQuote || hasSpecialCharacters(key) ? `'${key}'` : key
    temp = anyToStr(obj[key], keyQuote, `${_key}: `)
    if (index === lastIndex) {
      temp = removeLastComma(temp)
    }
    arr.push(temp)
  })
  arr.push('}')
  return arr.join(NEW_LINE)
}

/**
 * remove the last comma in the str
 * @param str
 */
function removeLastComma(str: string) {
  const arr = str.split(NEW_LINE)
  const lastLine = arr.pop()
  if (lastLine.endsWith(',')) {
    arr.push(lastLine.substr(0, lastLine.length - 1))
    return arr.join(NEW_LINE)
  }
  return str
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
    str = o + ''
  }
  return prefix + str + ','
}

/**
 * handle function
 * @param fn
 */
function handleFunction(fn: TypeFn): string {
  return fn.toString()
}

/**
 * handle array
 * @param arr
 * @param keyQuote
 */
function handleArray(arr: any[], keyQuote: boolean): string {
  const temp: string[] = arr.map(item => anyToStr(item, keyQuote))
  temp.unshift('[')
  // handle the last line comma
  const lastLine = removeLastComma(temp.pop())
  temp.push(lastLine, ']')
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
    }
    str = space(level * indentSpaces) + str
    if (str.endsWith('{') || str.endsWith('[')) {
      level++
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
