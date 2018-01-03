// =====================================================================================================================
// Directory Resource Renderer
// =====================================================================================================================

// Dependencies
import _ from 'lodash';
import $ from 'jquery';
import { GitHubService, Renderer, NullRenderer } from '../';
import { GitHubRepositoryDirectory, GitHubRepositoryFile } from '../../../../common/script/services/github/data';

/**
 * Handles client-side rendering
 * @export
 * @class DirectoryRenderer
 */
export default class DirectoryRenderer extends Renderer {

  /**
   * Creates an instance of Renderer.
   * @param {any} target Host element
   * @param {any} resource Resource to render
   * @memberof DirectoryRenderer
   */
  constructor ({ target, resource } = {}) {
    super({ target, resource });
  }

  /**
   * Start rendering process (internal implementation)
   * @memberof DirectoryRenderer
   */
  _start () {
    // Fetch all child resources and render
    setTimeout(async () => {

      // Add directory header
      $(this.element).html($(`<h1>~ ${ this.resource.name || 'HOME' } ~</h1<hr/>`));

      // Render all child resources
      for (let res of this.resource.children) {
        // Check if child is a file or a subdirectory
        if (res instanceof GitHubRepositoryFile) {

          // Fetch and render a file
          let md = await GitHubService.fetchResource(res.path);
          if (md) {
            // Render an file resource
            if (this.element) {
              $(this.element).append($(`<article>&gt;&gt;&gt; <a href="#!${ res.path }">${ res.name }</a><br/>${ this.converter.makeHtml(md) }</article>`));
            }
          }

        } else if (res instanceof GitHubRepositoryDirectory) {

          // Render a subdirectory link
          if (this.element) {
            $(this.element).append($(`<article>&gt;&gt;&gt; <a href="#!${ res.path }">${ res.name }</a></article>`));
          }

        }
      }

    });
  }

  /**
   * Stop rendering process (internal implementation)
   * @memberof DirectoryRenderer
   */
  _stop () {
    this.element = null;
  }

}
