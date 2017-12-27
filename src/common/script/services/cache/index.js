// =====================================================================================================================
// Caching service
// =====================================================================================================================

/**
 * Provides data caching
 * @export
 * @class CachingServiceClass
 */
export class CachingServiceClass {

  /**
   * Stores a key-value pair into cache
   * @param {any} key Stored key
   * @param {any} value Stored value
   * @param {any} timeout Optional timeout value (in [ms]), if provided value will only be preserved for the specified interval
   * @memberof CachingServiceClass
   */
  set (key, value, { timeout = null } = {}) {
    this._set(key, value, { timeout });
  }
  /**
   * Internal implementation of .set()
   * @param {any} key Stored key
   * @param {any} value Stored value
   * @param {any} timeout Optional timeout value (in [ms]), if provided value will only be preserved for the specified interval
   * @memberof CachingServiceClass
   */
  _set (key, value, { timeout = null } = {}) {
    key; value; timeout; throw new Error('Not implemented!');
  }

  /**
   * Loads a key-value pair from cache
   * @param {any} key Stored key
   * @returns {any} Stored value
   * @memberof CachingServiceClass
   */
  get (key) {
    return this._get(key);
  }
  /**
   * Internal implementation of .get()
   * @param {any} key Stored key
   * @returns {any} Stored value
   * @memberof CachingServiceClass
   */
  _get (key) {
    key; return (() => { throw new Error('Not implemented!'); })();
  }

}
