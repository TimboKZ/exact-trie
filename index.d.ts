declare module 'exact-trie' {
    /**
     * @param {object} options
     * @param {boolean} [options.ignoreCase]
     */
    export default class ExactTrie {
        constructor(options?: {
            ignoreCase?: boolean;
        });

        /**
         * @param {string} key
         * @param {*} value
         * @param {boolean} [reverse]
         * @returns {ExactTrie}
         */
        put(key: string, value: any, reverse?: boolean): ExactTrie;

        /**
         * @param {string[]} keys
         * @param {*|*[]} values
         * @param {boolean} [reverse]
         * @returns {ExactTrie}
         */
        putAll(keys: string[], values: any, reverse?: boolean): ExactTrie;

        /**
         * @param {string} key
         * @param {boolean} [reverse]
         * @returns {*}
         */
        get(key: string, reverse?: boolean): any;

        /**
         * @param {string[]} keys
         * @param {boolean} [reverse]
         * @returns {*[]}
         */
        getAll(keys: string[], reverse?: boolean): any;

        /**
         * @param {string} key
         * @param {boolean} [reverse]
         * @returns {boolean}
         */
        has(key: string, reverse?: boolean): boolean;

        /**
         * @param {string[]} keys
         * @param {boolean} [reverse]
         * @returns {boolean[]}
         */
        hasAll(keys: string[], reverse?: boolean): boolean[];

        /**
         * @param {string} string
         * @param {string|null} [checkpointChar]
         * @param {boolean} [reverse]
         * @returns {*}
         */
        getWithCheckpoints(string: string, checkpointChar?: string | null, reverse?: boolean): any;

        /**
         * @param {string[]} keys
         * @param {string|null} [checkpointChar]
         * @param {boolean} [reverse]
         * @returns {*[]}
         */
        getAllWithCheckpoints(keys: string[], checkpointChar?: string | null, reverse?: boolean): any;

        /**
         * @param {string} string
         * @param {string|null} [checkpointChar]
         * @param {boolean} [reverse]
         * @returns {*}
         */
        hasWithCheckpoints(string: string, checkpointChar?: string | null, reverse?: boolean): any;

        /**
         * @param {string[]} keys
         * @param {string|null} [checkpointChar]
         * @param {boolean} [reverse]
         * @returns {boolean[]}
         */
        hasAllWithCheckpoints(keys: string[], checkpointChar?: string | null, reverse?: boolean): boolean[];
    }
}
