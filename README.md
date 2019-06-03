# exact-trie
Node.js implementation of a trie and a radix tree tailored towards exact matches.

# Methods

#### `new ExactTrie([options])`
Used to create the trie: `const trie = new ExactTrie();`.
* `options` (optional)
    * `ignoreCase` (`true`, optional) set to `true` to convert all keys to lower case.

#### `trie.put(key, value, [reverse])`
Used to insert single element into the trie. Returns the same instance of `ExactTrie` to allow chaining.
* `key` search key, must be a string.
* `value` value to be inserted, can by any type.
* `reverse` (`false`, optional) set to `true` to reverse the key before inserting.

#### `trie.putAll(keys, values, [reverse])`
Used to insert multiple elements into the trie. Returns the same instance of `ExactTrie` to allow chaining.
* `keys` search keys, must be an array of strings.
* `values` values to be inserted, can be an array of values of any type or a single value. If an array is provided, each key from `keys` will be assigned a corresponding value from `values`. Otherwise all keys will receive the same value.
* `reverse` (`false`, optional) set to `true` to reverse the key before inserting.

#### `trie.get(key, [reverse])`
Used to retrieve elements from the trie. Returns `undefined` if the key is not present in the trie.
* `key` search key, must be a string.
* `reverse` (`false`, optional) set to `true` to reverse the key before searching.

#### `trie.getAll(keys, [reverse])`
Same as `get(...)`, except this function takes an array of keys and returns an array of values.

#### `trie.has(key, [reverse])`
Used to check if the key is present in the true. Returns a boolean.
* `key` search key, must be a string.
* `reverse` (`false`, optional) set to `true` to reverse the key before searching.

#### `trie.hasAll(keys, [reverse])`
Same as `has(...)`, except this function takes an array of keys and returns an array of booleans.

#### `trie.getWithCheckpoints(string, [checkpointChar], [reverse])`
Used to retrieve the value corresponding to they key that matches the longest prefix of `string`. If there are no
matches, `undefined` is returned.
* `string` string to check for prefixes, must be a string.
* `checkpointChar` (`null`, optional) character used to separate potential prefixes. When set to `null`, every possible
prefix is considered.
* `reverse` (`false`, optional) set to `true` to reverse the string before searching.

#### `trie.getAllWithCheckpoints(keys, [checkpointChar], [reverse])`
Same as `getWithCheckpoints(...)`, except this function takes an array of keys and returns an array of values.

#### `trie.hasWithCheckpoints(string, [checkpointChar], [reverse])`
Used to check if any key matches relevant prefixes from `string`. Returns a boolean
* `string` string to check for prefixes, must be a string.
* `checkpointChar` (`null`, optional) character used to separate potential prefixes. When set to `null`, every possible
prefix is considered.
* `reverse` (`false`, optional) set to `true` to reverse the string before searching.

#### `trie.hasAllWithCheckpoints(keys, [checkpointChar], [reverse])`
Same as `hasWithCheckpoints(...)`, except this function takes an array of keys and returns an array of booleans.

# Example

```js
const ExactTrie = require('exact-trie');

// Creating a trie instance
const trie = new ExactTrie({ignoreCase: true}); // `ignoreCase` is `true` by default

// Basic API and exact key matches
trie.put('life', 32);
console.log(trie.has('life')); // prints `true`
console.log(trie.get('life')); // prints `32`
console.log(trie.has('lif'));  // prints `false`
console.log(trie.get('lif'));  // prints `undefined`

// Multiple values with changing
trie
    .putAll(['a', 'b'], [1, 2])
    .putAll(['c', 'd'], 34)
    .put('e', 5);
console.log(trie.getAll(['a', 'b', 'c', 'd', 'e', 'f']));
// -> prints `[1, 2, 34, 34, 5, undefined]`

// Various values and overwriting
const world = {response: 'world'};
trie.put('hello', world);
console.log(trie.get('hello')); // prints `{ response: 'world' }`
trie.put('hello', 3);
console.log(trie.get('hello')); // prints `3`

// Reversing keys
trie.put('oxygen', 8, true);
console.log(trie.has('oxygen'));               // prints `false`
console.log(trie.has('negyxo'));               // prints `true`
console.log(trie.has('oxygen', true)); // prints `true`

// Matching with checkpoints
trie.put('tim', 'Name is Tim');
trie.put('tim.kuzh', 'Tim Kuzh is the name');
console.log(trie.getWithCheckpoints('tim.kuzh', '.'));
// -> prints `Tim Kuzh is the name`
console.log(trie.getWithCheckpoints('tim.cook', '.'));
// -> prints `Name is Tim`

// Matching file extensions
trie.put('tar.gz', 'archive', true);
trie.put('gz', 'gzipped file', true);
console.log(trie.getWithCheckpoints('MyArchive.tar.gz', '.', true));
// -> prints `archive`
console.log(trie.getWithCheckpoints('DataSet.gz', '.', true));
// -> prints `gzipped file`
```
