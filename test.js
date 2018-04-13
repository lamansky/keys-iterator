'use strict'

const assert = require('assert')
const isIterator = require('is-iterator')
const keys = require('.')

describe('keysIterator()', function () {
  it('should iterate Array indexes', function () {
    const i = keys(['a', 'b'])
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 0)
    assert.strictEqual(i.next().value, 1)
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate incrementing integers for iterator', function () {
    function * gen () {
      yield 'a'
      yield 'b'
    }

    const i = keys(gen())
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 0)
    assert.strictEqual(i.next().value, 1)
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate Map entries', function () {
    const i = keys(new Map([['key', 'value']]))
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'key')
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate keys of a custom Map class', function () {
    class MyMap {
      keys () { return ['key'] }
    }
    assert.strictEqual(keys(new MyMap()).next().done, true)
    const i = keys(new MyMap(), {maps: MyMap})
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'key')
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate keys of a custom Map class referenced by name string', function () {
    class MyMap {
      keys () { return ['key'] }
    }
    assert.strictEqual(keys(new MyMap()).next().done, true)
    const i = keys(new MyMap(), {maps: 'MyMap'})
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'key')
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate Object keys', function () {
    const i = keys({key: 'value'})
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'key')
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate inherited Object property keys if `inObj` is true', function () {
    function A () {}
    A.prototype.key = 'value'
    const a = Array.from(keys(new A(), {inObj: true}))
    assert.strictEqual(a.length, 1)
    assert(a.some(k => k === 'key'))
  })

  it('should iterate non-enumerable Object property keys if `reflectObj` is true', function () {
    const obj = {}
    Object.defineProperty(obj, 'key', {value: 'value', enumerable: false})
    assert.strictEqual(Array.from(keys(obj)).length, 0)
    const a = Array.from(keys(obj, {reflectObj: true}))
    assert.strictEqual(a.length, 1)
    assert(a.some(k => k === 'key'))
  })

  it('should iterate incrementing integers for Set', function () {
    const i = keys(new Set(['value']))
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 0)
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate String character indexes', function () {
    const i = keys('hi')
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 0)
    assert.strictEqual(i.next().value, 1)
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate Typed Array keys', function () {
    const i = keys(new Int32Array(new ArrayBuffer(4)))
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 0)
    assert.strictEqual(i.next().done, true)
  })

  it('should support the bind operator', function () {
    const i = keys.call(['test'])
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 0)
    assert.strictEqual(i.next().done, true)
  })
})
