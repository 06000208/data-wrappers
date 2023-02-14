/**
 * If an instance of FlatDataWrapper, returns FlatDataWrapper.data, otherwise returns input
 * @param {*} value
 * @returns {Object.<string, *>}
 */
export const resolveDataFromWrapper = (value) => value instanceof FlatDataWrapper ? value.data : value;

/**
 * Whether or not something is a data wrapper
 * @param {*} value
 * @returns {boolean};
 */
export const isDataWrapper = (value) => Boolean(value instanceof FlatDataWrapper);

/**
 * Data wrapper for a flat object and defaults accessible through a proxy, mainly useful for flat key/value settings or user data.
 */
export class FlatDataWrapper {
    /**
     * @param {Object.<string, *>} [data]
     * @param {Object.<string, *>} [defaults] Flat object with default values
     * @param {?string} [id]
     */
    constructor(data, defaults, id) {
        /**
         * Regular settings data
         * @type {{}|Object.<string, *>}
         */
        this.data = { ...data };

        /**
         * Default settings
         * @type {{}|Object.<string, *>}
         * @readonly
         */
        this.defaults = { ...defaults };

        /**
         * Optional identifier this data is associated with, for use with DataStore and AsyncDataStore
         * @type {?string}
         */
        this.id = id || null;
    }

    /**
     * Proxy for accessing your data with fallback to provided defaults when properties are undefined
     *
     * Setting, deleting, keys(), entries(), etc. will be performed on your data unchanged
     * @returns {Proxy}
     */
    get proxy() {
        // This property shadows the getter, as we can't delete or redeclare getters on class instances
        Object.defineProperty(this, "proxy", {
            value: new Proxy(this.data, {
                get: (target, key) => target[key] === undefined ? this.defaults[key] : target[key],
            }),
            enumerable: true,
        });
        return this.proxy;
    }

    /**
     * Merges this wrapper with new data, updating any properties which already exist
     *
     * This operates with the presumption of flat objects, that is, properties which are arrays or objects will be overwritten with new values rather than deep merging
     *
     * This accepts either an instance of FlatDataWrapper or a flat object
     * @param {FlatDataWrapper|Object.<string, *>} value
     */
    merge(value) {
        this.data = { ...this.data, ...resolveDataFromWrapper(value) };
        return this;
    }
}
