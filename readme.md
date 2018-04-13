# keys-iterator

Returns an iterator of the keys/indexes of an Object, Map, Array, or Typed Array. Useful for when you need the keys of a collection object but aren’t sure what type of collection you’ll be given.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i keys-iterator
```

## API

The module exports a single function.

### Parameter

Bindable: `c` (Array, Iterator, Object, Map, Set, or Typed Array)

### Return Value

An iterator which yields keys from the collection.

## Examples

### Arrays

```javascript
const keys = require('keys-iterator')

const i = keys(['a', 'b'])
i.next().value // 0
i.next().value // 1
i.next().done // true

// Supports the bind operator
['a', 'b']::keys()
```

### Iterators

`keys-iterator` will treat an iterator as if it were an array of values. Each “key” will be an incrementing integer index that starts at zero.

```javascript
const keys = require('keys-iterator')

function * gen () {
  yield 'a'
  yield 'b'
}

const i = keys(gen())
i.next().value // 0
i.next().value // 1
i.next().done // true
```

### Maps

```javascript
const keys = require('keys-iterator')

const map = new Map()
map.set('key', 'value')

const i = keys(map)
i.next().value // 'key'
i.next().done // true
```

### Objects

```javascript
const keys = require('keys-iterator')

const i = keys({key: 'value'})
i.next().value // 'key'
i.next().done // true

// Supports the bind operator
const obj = {key: 'value'}
obj::keys()
```

### Sets

`keys-iterator` will treat a Set like an array, and will yield integer index keys starting at zero. Note that this behavior is different from that of the built-in [`Set.prototype.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys) method.

```javascript
const keys = require('keys-iterator')

const set = new Set()
set.add('first')
set.add('second')

const i = keys(set)
i.next().value // 0
i.next().value // 1
i.next().done // true
```

### Typed Arrays

```javascript
const keys = require('keys-iterator')

const typedArray = new Int32Array(new ArrayBuffer(4))

const i = keys(typedArray)
i.next().value // 0
i.next().done // true
```

## Related

* [entries-iterator](https://github.com/lamansky/entries-iterator)
* [entries-array](https://github.com/lamansky/entries-array)
* [keys-array](https://github.com/lamansky/keys-array)
* [prop-keys](https://github.com/lamansky/prop-keys)
* [values-iterator](https://github.com/lamansky/values-iterator)
* [values-array](https://github.com/lamansky/values-array)
