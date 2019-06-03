/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license LGPL-3.0
 */

class ExactTrie {

    /**
     * @param {object} options
     * @param {boolean} [options.ignoreCase]
     */
    constructor(options = {}) {
        this.trie = {};
        this.ignoreCase = options.ignoreCase !== undefined ? !!options.ignoreCase : true;
    }

    /**
     * @param {string} key
     * @param {*} value
     * @param {boolean} [reverse]
     */
    put(key, value, reverse = false) {
        if (this.ignoreCase) key = key.toLowerCase();

        let curr = this.trie;

        if (reverse) {
            for (let i = key.length - 1; i >= 0; --i) {
                const char = key.charAt(i);
                if (!curr[char]) curr[char] = {};
                curr = curr[char];
            }
        } else {
            for (let i = 0; i < key.length; ++i) {
                const char = key.charAt(i);
                if (!curr[char]) curr[char] = {};
                curr = curr[char];
            }
        }

        curr['__'] = value;
    }

    /**
     * @param {string[]} keys
     * @param {*|*[]} values
     * @param {boolean} [reverse]
     */
    putAll(keys, values, reverse = false) {
        const valuesIsArray = toString.call(values) === '[object Array]';
        for (let i = 0; i < keys.length; ++i) {
            this.put(keys[i], valuesIsArray ? values[i] : values, reverse);
        }
    }

    /**
     * @param {string} key
     * @param {boolean} [reverse]
     * @returns {*}
     */
    get(key, reverse = false) {
        if (this.ignoreCase) key = key.toLowerCase();

        let curr = this.trie;
        if (reverse) {
            for (let i = key.length - 1; i >= 0; --i) {
                const char = key.charAt(i);
                let next = curr[char];
                if (!next) return;
                curr = next;
            }
        } else {
            for (let i = 0; i < key.length; i++) {
                const char = key.charAt(i);
                let next = curr[char];
                if (!next) return;
                curr = next;
            }
        }
        return curr['__'];
    }

    /**
     * @param {string} key
     * @param {boolean} [reverse]
     * @returns {boolean}
     */
    has(key, reverse = false) {
        return this.get(key, reverse) !== undefined;
    }

    /**
     * @param {string} string
     * @param {string|null} [checkpointChar]
     * @param {boolean} [reverse]
     * @returns {*}
     */
    getWithCheckpoints(string, checkpointChar = null, reverse = false) {
        if (this.ignoreCase) string = string.toLowerCase();

        let candidate = undefined;
        let curr = this.trie;

        if (reverse) {
            for (let i = string.length - 1; i >= 0; --i) {
                const char = string.charAt(i);
                let next = curr[char];
                if (!next) break;
                if (checkpointChar === null || char === checkpointChar) {
                    const val = curr['__'];
                    if (val) candidate = val;
                }
                curr = next;
            }
        } else {
            for (let i = 0; i < string.length; ++i) {
                const char = string.charAt(i);
                let next = curr[char];
                if (!next) break;
                if (char === checkpointChar) {
                    const val = curr['__'];
                    if (val) candidate = val;
                }
                curr = next;
            }
        }

        const val = curr['__'];
        if (val) candidate = val;

        return candidate;
    }

    /**
     * @param {string} string
     * @param {string|null} [checkpointChar]
     * @param {boolean} [reverse]
     * @returns {*}
     */
    hasWithCheckpoints(string, checkpointChar = null, reverse = false) {
        return this.getWithCheckpoints(string, checkpointChar, reverse) !== undefined;
    }

}

module.exports = ExactTrie;

