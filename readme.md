# keys-iterator

Returns an iterator of the keys/indexes of an Object, Map, Array, or Typed Array. Useful for when you need the keys of a collection object but aren’t sure what type of collection you’ll be given.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i keys-iterator
```

## API

The module exports a single function.

### Parameters

1. Bindable: `c` (Array, iterator, Object, Map, Set, string, or Typed Array)
2. Object argument:
    * Optional: `arrays` / `maps` / `sets` (array, class, or string): A class that should be treated as equivalent to `Array`/`Map`/`Set` (respectively), the string name of such a class, or an array of such classes/strings.
    * Optional: `inObj` (boolean): Whether or not to act like the “in” operator by including inherited Object property keys. Only takes effect if `c` is an Object (i.e. not another recognized type). Defaults to `false`.
    * Optional: `reflectObj` (boolean): Whether or not to use reflection to include non-enumerable Object property keys. Only takes effect if `c` is an Object (i.e. not another recognized type). Defaults to `false`.

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

#### Inherited Object Properties

Include Object property keys from the prototype chain by setting `inObj` to `true`:

```javascript
const keys = require('keys-iterator')

function Cls () {}
Cls.prototype.key = 'value'

const i = keys(new Cls(), {inObj: true})
i.next().value // 'key'
i.next().done // true
```

#### Non-Enumerable Object Properties

Include non-enumerable Object property keys by setting `reflectObj` to `true`:

```javascript
const keys = require('keys-iterator')

const obj = {}
Object.defineProperty(obj, 'key', {value: 'value', enumerable: false})

const i = keys(obj, {reflectObj: true})
i.next().value // 'key'
i.next().done // true
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

### Strings

`keys-iterator` will treat a string like a character array, and will yield integer index keys starting at zero.

```javascript
const keys = require('keys-iterator')

const i = keys('hi')
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
