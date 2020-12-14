/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-13 17:23
 */
import { DEF_OPTIONS, NEW_LINE } from './constants'
import { TypeOptions, TypeObject } from '../types/index'
import { space, hasSpace, handleString, isObject, isFunction, isArray, isString } from './helper'

/**
 * handle object
 * @param obj 
 */
function handleObject(obj: TypeObject): string {
  const arr: string[] = ['{']
  let _key: string
  let temp: string
  Object.keys(obj).forEach(key => {
    _key = hasSpace(key) ? `'${key}'` : key
    temp = anyToStr(obj[key], `${_key}: `)
    arr.push(temp)
  })
  arr.push('}')
  return arr.join(NEW_LINE)
}

/**
 * any object to string
 * @param o 
 * @param prefix 
 */
function anyToStr(o: any, prefix?: string): string {
  let str: string
  if (isFunction(o)) {
    str = handleFunction(o)
  } else if (isObject(o)) {
    str = handleObject(o)
  } else if(isString(o)) {
    str = handleString(o)
  } else if (isArray(o)) {
    str = handleArray(o)
  } else {
    str = o + ','
  }
  return (prefix || '') + str
}

/**
 * handle function
 * @param fn
 */
function handleFunction(fn: object): string {
  return fn.toString() + ','
}

/**
 * handle array
 * @param arr 
 */
function handleArray(arr: any[]): string {
  const temp: string[] = arr.map(item => anyToStr(item))
  temp.unshift('[')
  temp.push(']')
  return temp.join(NEW_LINE)
}

/**
 * object to string
 * @param o 
 * @param options 
 */
function objToStr(o: any, options?: TypeOptions): string {
  const { prefix, initSpaces, indentSpaces, doubleQuotes } = { ...DEF_OPTIONS, ...options }
  let level = 0
  let str: string
  let initSpacesStr: string = space(initSpaces)
  const arr = anyToStr(o).split(NEW_LINE).map((line, index) => {
    str = line.trim()
    // first line
    if (index === 0 && prefix) {
      str = prefix + str 
    }
    
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
    return str
  })
  return arr.join(NEW_LINE)
}

export {
  objToStr
}
