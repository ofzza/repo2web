// =====================================================================================================================
// DOM service
// =====================================================================================================================

// Dependencies
import _ from 'lodash';
import $ from 'jquery';
import { GitHubService, NullRenderer, FileRenderer, DirectoryRenderer } from '../';
import { GitHubRepositoryDirectory, GitHubRepositoryFile } from '../../../../common/script/services/github/data';

/**
 * Handles client-side DOM moitoring and manipulation
 * @export
 * @class DomServiceClass
 */
export class DomServiceClass {

  /**
   * Initializes DOM monitoring
   * @memberof RouterServiceClass
   */
  async initialize () {

    // Initialize internal properties
    this._contentHostElements = {
      routing: [],
      static: []
    };

    // Monitor DOM for changes
    let updateOnDomChange = () => {

      // Find and register all content hosts
      let hostEls = $('[r2w-content]');
      _.forEach(hostEls, (el) => {
        // Check if already registered
        if (!el.hasAttribute('__r2w-content-registered')) {
          // Register as host element
          if (!el.getAttribute('r2w-content')) {
            // Register a routing content host element
            this._contentHostElements.routing.push(
              new ContentHostElement(el)
            );
          } else {
            // Register a static content host element
            this._contentHostElements.static.push(
              new ContentHostElement(el)
            );
          }
          // Mark as registered
          el.setAttribute('__r2w-content-registered', 'true');
        }
      });

      // Remove any destroyed content hosts
      _.remove(this._contentHostElements.routing, (el) => { return el.destroyed; })
      _.remove(this._contentHostElements.static, (el) => { return el.destroyed; })
    }
    document.addEventListener('DOMSubtreeModified', _.debounce(updateOnDomChange, 100, { leading: true, trailing: true, maxWait: 100 }));
    updateOnDomChange();

  }

  /**
   * Gets regostered routing host elements
   * @readonly
   * @memberof DomServiceClass
   */
  get routingHostElements () { return this._contentHostElements.routing; }
  /**
   * Gets regostered static host elements
   * @readonly
   * @memberof DomServiceClass
   */
  get staticHostElements () { return this._contentHostElements.static; }

}

// Initialize and export a singleton instance
const domService = new DomServiceClass();
export default domService;

/**
 * Represents a content host element which can be used as a render target
 * @class ContentHostElement
 */
class ContentHostElement {

  /**
   * Creates an instance of ContentHostElement
   * @param {any} element HTML element being managed
   * @memberof ContentHostElement
   */
  constructor (element) {

    // Store proeprties
    this.element = element;
    this.path = element.getAttribute('r2w-content') || null;
    this.destroyed = false;

    // Monitor element being removed
    $(element).on('remove', () => {
      // Stop renderer if a renderer is attached
      if (this._renderer) { this._renderer.stop(); }
      // Mark as destroyed
      this.destroyed = true;
    });

    // If static resource path provided, render static resource
    if (this.path) {
      this.render(GitHubService.tree.find(this.path));
    }

  }

  /**
   * Renders a resource using managed element as host
   * @param {any} resource Resource to render
   * @memberof ContentHostElement
   */
  render (resource) {
    // If rendereralrady attached to target, stop renderer
    if (this._renderer) { this._renderer.stop(); }
    // Select and start render to target
    if (!resource) {
      // Render a missing 404 resource
      this._renderer = new NullRenderer({ target: this.element, resource });
      this._renderer.start();
    } else if (resource instanceof GitHubRepositoryFile) {
      // Render an file resource
      this._renderer = new FileRenderer({ target: this.element, resource });
      this._renderer.start();
    } else if (resource instanceof GitHubRepositoryDirectory) {
      // Render a directory resource
      this._renderer = new DirectoryRenderer({ target: this.element, resource })
      this._renderer.start();
    }
  }

}
