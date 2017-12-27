// =====================================================================================================================
// Caching service
// =====================================================================================================================

// Dependencies
import { CachingServiceClass as CachingServiceBase, Configuration } from '../../../../common/script/services';

/**
 * Provides data caching
 * @export
 * @class CachingServiceClass
 */
export class CachingServiceClass extends CachingServiceBase {

  /**
   * Stores a key-value pair into cache
   * @param {any} key Stored key
   * @param {any} value Stored value
   * @param {any} timeout Optional timeout value (in [ms]), if provided value will only be preserved for the specified interval
   * @memberof CachingServiceClass
   */
  _set (key, value, { timeout = null } = {}) {
    // Compose repo specific key
    let repoKey = `${ Configuration.GithubUsername }:${ Configuration.GithubRepository }:${ Configuration.GithubBranch }:${ key }`;
    // Save to storage
    window.localStorage.setItem(repoKey, JSON.stringify({ value, timeout: (timeout ? (Date.now() + timeout) : null) }));
  }

  /**
   * Loads a key-value pair from cache
   * @param {any} key Stored key
   * @returns {any} Stored value
   * @memberof CachingServiceClass
   */
  _get (key) {
    // Compose repo specific key
    let repoKey = `${ Configuration.GithubUsername }:${ Configuration.GithubRepository }:${ Configuration.GithubBranch }:${ key }`;
    // Load data from storage
    let data = JSON.parse(window.localStorage.getItem(repoKey) || null);
    // Check if data and if data timed out
    if (data && (!data.timeout || (data.timeout > Date.now()))) {
      // Return loaded data
      return data.value;
    } else if (data) {
      // Clear timed out data
      window.localStorage.removeItem(repoKey);
    }
  }

}

// Initialize and export a singleton instance
const cachingService = new CachingServiceClass();
export default cachingService;
