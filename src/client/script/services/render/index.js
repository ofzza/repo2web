// =====================================================================================================================
// Renderer
// =====================================================================================================================

// Dependencies
import $ from 'jquery';
import showdown from 'showdown';

/**
 * Handles client-side rendering
 * @export
 * @class Renderer
 */
export default class Renderer {

  /**
   * Rendering status enum
   * @readonly
   * @static
   * @memberof Renderer
   */
  static get RenderingStatus () { return RenderingStatus; }

  /**
   * Creates an instance of Renderer.
   * @param {any} target Host element
   * @param {any} resource Resource to render
   * @memberof Renderer
   */
  constructor ({ target, resource } = {}) {

    // Store properties
    this.target = target;
    this.resource = resource;
    this.element = null;
    this.status = Renderer.RenderingStatus.Stopped;

    // Initialize markdown converter
    this.converter = new showdown.Converter();

  }

  /**
   * Start rendering process
   * @memberof Renderer
   */
  start () {

    // Set running status
    this.status = Renderer.RenderingStatus.Running;

    // Initialize and append a container element
    this.element = $(`<div></div>`);
    $(this.target).empty();
    $(this.target).append(this.element);

    // Render a loader
    if (this.element) {
      $(this.element).html(' ... loading ... ');
    }

    // Execute internal implementation
    this._start();

  }
  /**
   * Start rendering process (internal implementation)
   * @memberof Renderer
   */
  _start () {
    throw new Error('Not implemented!');
  }

  /**
   * Stop rendering process
   * @memberof Renderer
   */
  stop () {
    // Set running status
    this.status = Renderer.RenderingStatus.Stopped;
    // Execute internal implementation
    this._stop();
  }
  /**
   * Stop rendering process (internal implementation)
   * @memberof Renderer
   */
  _stop () {
    throw new Error('Not implemented!');
  }

}

// Rendering status enum
const RenderingStatus = {
  Running: 0,
  Stopped: 1
};
