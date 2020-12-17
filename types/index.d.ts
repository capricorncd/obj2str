/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-05 11:35
 */
export type TypeOptions = {
  initSpaces?: number,
  indentSpaces?: number,
  prefix?: string,
  doubleQuotes?: boolean,
  keyQuote?: boolean
}

export type TypeObject = {
  [key: string]: any
}

export function obj2str(obj: any, options?: TypeOptions): string;

export type TypeFn = (...args: any[]) => any
