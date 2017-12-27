// =====================================================================================================================
// Configuration service
// =====================================================================================================================

/**
 * Gets and manages configuration
 * @export
 * @class ConfigurationServiceClass
 */
export class ConfigurationServiceClass {

  /**
   * Fetches configuration
   * @memberof ConfigurationServiceClass
   */
  async initialize () {
    // Call extended initialization implementation
    await this._initialize();
    // Prompt configuration initialized
    if (Configuration.isValid) {
      console.log('> Configuration: ', configuration);
    } else {
      console.warn('> Configuration missing!');
    }
  }
  /**
   * Fetches configuration (Extendable implementation, should aquire configuration into Configuration class)
   * @memberof ConfigurationServiceClass
   */
  async _initialize () { throw new Error('Not implemented!'); }

}

// Holds configuration values
const configuration = {};

/**
 * Holds aquired configuration
 * @class Configuration
 */
export default class Configuration {

  /**
   * Github username
   * @static
   * @memberof Configuration
   */
  static get GithubUsername () { return configuration['github-username']; }
  static set GithubUsername (value) { configuration['github-username'] = value; }
  /**
   * Github repository
   * @static
   * @memberof Configuration
   */
  static get GithubRepository () { return configuration['github-repository']; }
  static set GithubRepository (value) { configuration['github-repository'] = value; }
  /**
   * Github branch
   * @static
   * @memberof Configuration
   */
  static get GithubBranch () { return configuration['github-branch']; }
  static set GithubBranch (value) { configuration['github-branch'] = value; }

  /**
   * Checks if minimal configuration available
   * @readonly
   * @static
   * @memberof Configuration
   */
  static get isValid () {
    return Configuration.GithubUsername
        && Configuration.GithubRepository
        && Configuration.GithubBranch;
  }

}
