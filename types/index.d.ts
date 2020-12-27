/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-05 11:35
 */
export interface IOptions {
  initSpaces?: number,
  indentSpaces?: number,
  prefix?: string,
  doubleQuotes?: boolean,
  keyQuote?: boolean
}

export interface IAnyObject {
  [key: string]: any
}

export function obj2str<T>(obj: T, options?: IOptions): string;

export type TypeFn = <T>(...args: T[]) => T
