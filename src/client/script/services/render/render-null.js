// =====================================================================================================================
// NULL Resource Renderer
// =====================================================================================================================

// Dependencies
import $ from 'jquery';
import { Renderer } from '../';

/**
 * Handles client-side rendering
 * @export
 * @class NullRenderer
 */
export default class NullRenderer extends Renderer {

  /**
   * Creates an instance of Renderer.
   * @param {any} target Host element
   * @param {any} resource Resource to render
   * @memberof NullRenderer
   */
  constructor ({ target, resource } = {}) {
    super({ target, resource });
  }

  /**
   * Start rendering process (internal implementation)
   * @memberof NullRenderer
   */
  _start () {
    // Fetch file resource and render
    setTimeout(() => {
      if (this.element) {
        $(this.element).html('404, RESOURCE NOT FOUND!');
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
