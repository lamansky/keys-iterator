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

  it('should iterate Object keys', function () {
    const i = keys({key: 'value'})
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'key')
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate incrementing integers for Set', function () {
    const i = keys(new Set(['value']))
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 0)
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
