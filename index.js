'use strict'

const count = require('map-iterable')((x, i) => i)
const emptyIterator = require('empty-iterator')
const is = require('is-instance-of')
const isIterator = require('is-iterator')
const isObject = require('is-object')
const propKeys = require('prop-keys')
const sbo = require('sbo')
const typedArrays = require('typed-arrays').names()

module.exports = sbo((c, {inObj, arrays = [], maps = [], reflectObj, sets = []} = {}) => {
  if (isIterator(c) || is(c, ['Set', sets])) return count(c)
  if (typeof c === 'string') return Array.from(c).keys()
  if (is(c, ['Array', arrays, 'Map', maps, typedArrays])) return c.keys()[Symbol.iterator]()
  if (isObject(c)) return propKeys(c, {enumOnly: !reflectObj, own: !inObj})
  return emptyIterator()
})
