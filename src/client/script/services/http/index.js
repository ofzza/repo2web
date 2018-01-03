// =====================================================================================================================
// HTTP service
// =====================================================================================================================

// Dependencies
import _ from 'lodash';
import $ from 'jquery';
import { HttpServiceClass as HttpServiceBase, HttpSuccessResponse, HttpErrorResponse } from '../../../../common/script/services';

/**
 * Fetches HTTP resources
 * @export
 * @class HttpServiceClass
 */
export class HttpServiceClass extends HttpServiceBase {

  /**
   * Fetches an HTTP resource (Extendable implementation, should implement context apropriate HTTP client)
   * @param {any} method HTTP method
   * @param {any} url HTTP url of the resource
   * @param {any} query HTTP URL query parameters
   * @param {any} payload HTTP request payload
   * @param {any} headers HTTP request headers
   * @returns {Promise} Promise of server response
   * @memberof HttpServiceClass
   */
  async _fetch ({ method, url, query, payload, headers } = {}) {
    return new Promise((resolve) => {
      // Fetch HTTP resource
      $.ajax({
        method,
        url: `${ url }?${ (_.map(query, (value, key) => { return `${ key }=${ value }`; })).join('&') }`,
        data: payload,
        headers,
        success: (data, textStatus, jqXHR) => {
          resolve(new HttpSuccessResponse({
            code: jqXHR.status,
            headers: jqXHR.getAllResponseHeaders().split('\n'),
            data
          }));
        },
        error: (jqXHR, textStatus, err) => {
          resolve(new HttpErrorResponse({
            code: jqXHR.status,
            headers: jqXHR.getAllResponseHeaders().split('\n'),
            error: new Error(err)
          }));
        }
      });
    });
  }

}

// Initialize and export a singleton instance
const httpService = new HttpServiceClass();
export default httpService;
