/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-13 17:24
 */
import { SPACE } from './constants'

/**
 * create space string
 * @param n count
 */
export function space(n: number): string {
  return new Array(n).fill(SPACE).join('')
}

/**
 * Determine whether the string contains spaces
 * @param str string
 */
export function hasSpace(str: string): boolean {
  return /\s/.test(str)
}

/**
 * Determine whether str is a string
 * @param str any object
 */
export function isString(str: any): boolean {
  return typeof str === 'string'
}

/**
 * Determine whether fn is a function
 * @param fn
 */
export function isFunction(fn: any): boolean {
  return typeof fn === 'function'
}

/**
 * Determine whether nul is null
 * @param nul
 */
export function isNull(nul: any): boolean {
  return nul === null
}

/**
 * Determine whether o is an Object
 * @param o
 */
export function isObject(o: any): boolean {
  return Object.prototype.toString.call(o) === '[object Object]' && !isFunction(o) && !isNull(o)
}

/**
 * Determine whether arr is an array
 * @param arr
 */
export function isArray(arr: any): boolean {
  return Array.isArray(arr)
}
