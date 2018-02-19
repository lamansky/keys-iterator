'use strict'

const count = require('map-iterable')((x, i) => i)
const is = require('is-instance-of')
const isIterator = require('is-iterator')
const sbo = require('sbo')
const structures = ['Array', 'Map', require('typed-arrays').names()]

module.exports = sbo(c => (isIterator(c) || is(c, 'Set')) ? count(c) : is(c, structures) ? c.keys() : Object.keys(c)[Symbol.iterator]())
