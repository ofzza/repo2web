// =====================================================================================================================
// File Resource Renderer
// =====================================================================================================================

// Dependencies
import _ from 'lodash';
import $ from 'jquery';
import { GitHubService, Renderer, NullRenderer } from '../';

/**
 * Handles client-side rendering
 * @export
 * @class FileRenderer
 */
export default class FileRenderer extends Renderer {

  /**
   * Creates an instance of Renderer.
   * @param {any} target Host element
   * @param {any} resource Resource to render
   * @memberof FileRenderer
   */
  constructor ({ target, resource } = {}) {
    super({ target, resource });
  }

  /**
   * Start rendering process (internal implementation)
   * @memberof FileRenderer
   */
  _start () {
    // Fetch file resource and render
    setTimeout(async () => {
      let md = await GitHubService.fetchResource(this.resource.path);
      if (md) {
        // Render an file resource
        if (this.element) {
          $(this.element).empty();
          $(this.element).append(`<article>${ this.converter.makeHtml(md) }</article>`);
        }
      } else {
        // Render a missing 404 resource
        (new NullRenderer({ target: this.target, resource: this.resource })).start();
      }
    });
  }

  /**
   * Stop rendering process (internal implementation)
   * @memberof FileRenderer
   */
  _stop () {
    this.element = null;
  }

}
