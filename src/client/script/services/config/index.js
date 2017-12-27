// =====================================================================================================================
// Configuration service
// =====================================================================================================================

// Dependencies
import { ConfigurationServiceClass as ConfigurationServiceBase, Configuration } from '../../../../common/script/services';
import { HttpService } from '../';

/**
 * Gets and manages configuration
 * @export
 * @class ConfigurationServiceClass
 */
export class ConfigurationServiceClass extends ConfigurationServiceBase  {

  /**
   * Fetches configuration
   * @memberof ConfigurationServiceClass
   */
  async _initialize () {
    let config;
    try {
      config = config || await fetchConfigurationFromHtmlScriptTag();
    } catch (err) {
      console.error(err);
    }
    try {
      config = config || await fetchConfigurationPassedByServer();
    } catch (err) {
      console.error(err);
    }
    try {
      config = config || await fetchConfigurationFromJsonFile();
    } catch (err) {
      console.error(err);
    }
  }

}

// Initialize and export a singleton instance
const configurationService = new ConfigurationServiceClass();
export default configurationService;

// Get script tag from which bootstrapped
const scriptTag = document.currentScript;
/**
 * Attempts to read configuration from the <script /> element loading repo2web JS
 * TODO: not implemented!
 */
async function fetchConfigurationFromHtmlScriptTag() {
  if (scriptTag.attributes['github-username'])    { Configuration.GithubUsername    = scriptTag.attributes['github-username'].value; }
  if (scriptTag.attributes['github-repository'])  { Configuration.GithubRepository  = scriptTag.attributes['github-repository'].value; }
  if (scriptTag.attributes['github-branch'])      { Configuration.GithubBranch      = scriptTag.attributes['github-branch'].value; }
  return Promise.resolve(Configuration.isValid);
}
/**
 * Attempts to read configuration returned ba the server component in the maion page response
 * TODO: not implemented!
 */
async function fetchConfigurationPassedByServer() {
  return Promise.resolve(Configuration.isValid);
}
/**
 * Attempts to read configuration from a server-side config.json file
 */
async function fetchConfigurationFromJsonFile() {
  try {
    let json = await HttpService.get({ url: './config.json' });
    if (json && json['github-username'])    { Configuration.GithubUsername    = json['github-username']; }
    if (json && json['github-repository'])  { Configuration.GithubRepository  = json['github-repository']; }
    if (json && json['github-branch'])      { Configuration.GithubBranch      = json['github-branch']; }
  } catch (err) { }
  return Promise.resolve(Configuration.isValid);
}
