// =====================================================================================================================
// Router service
// =====================================================================================================================

// Dependencies
import _ from 'lodash';
import $ from 'jquery';
import showdown from 'showdown';
import { DomService, GitHubService } from '../';

/**
 * Handles client-side routing
 * @export
 * @class RouterServiceClass
 */
export class RouterServiceClass {

  /**
   * Initializes routing
   * @param {any} hash If true, client-side only routing will be used with route paths behind "#!" in the URL
   * @memberof RouterServiceClass
   */
  async initialize ({ hash = true } = {}) {

    // Set properties
    this.hash = hash;

    // Do routing
    await this.handleLocationChange();
    window.addEventListener('popstate', this.handleLocationChange.bind(this));

  }

  /**
   * Handles a window.location change by loading the proper route for the new location
   * @memberof RouterServiceClass
   */
  async handleLocationChange () {

    // Parse location and match to a route resource
    let location = window.location.href,
        path = (!this.hash ? parseStandardRoute(location) : parseHashRoute(location)),
        resource = GitHubService.tree.find(path);

    // Render resource
    _.forEach(DomService.routingHostElements, (target) => {
      target.render(resource);
    });

  }

}

// Initialize and export a singleton instance
const routerService = new RouterServiceClass();
export default routerService;

/**
 * Extracts route from standard routing location URL
 * @param {any} url Location URL
 * @returns {any} Route URL
 */
function parseStandardRoute (url) {
  return _.last(url.split('://')).split('/').slice(1).join('/');
}
/**
 * Extracts route from hash-routing location URL
 * @param {any} url Location URL
 * @returns {any} Route URL
 */
function parseHashRoute (url) {
  let path = url.split('#!');
  return (path.length > 1 ? path[1] : null);
}
