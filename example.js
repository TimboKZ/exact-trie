const ExactTrie = require('./lib/ExactTrie');

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
