// =====================================================================================================================
// HTTP service
// =====================================================================================================================

/**
 * Fetches HTTP resources
 * @export
 * @class HttpServiceClass
 */
export class HttpServiceClass {

  /**
   * Fetches an HTTP resource
   * @param {any} method HTTP method
   * @param {any} url HTTP url of the resource
   * @param {any} query HTTP URL query parameters
   * @param {any} payload HTTP request payload
   * @param {any} headers HTTP request headers
   * @memberof HttpServiceClass
   */
  async fetch ({
    method  = 'GET',
    url,
    query   = {},
    payload    = {},
    headers = {}
  } = {}) {
    return await this._fetch({ method, url, query, payload, headers })
  }

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
    method; url; query; payload; headers; return (() => { throw new Error('Not implemented!'); })();
  }

  /**
   * GET HTTP resource
   * @param {any} url HTTP url of the resource
   * @param {any} query HTTP URL query parameters
   * @param {any} headers HTTP request headers
   * @memberof HttpServiceClass
   */
  async get ({ url, query, headers } = {}) {
    return await this.fetch({
      method: 'GET',
      url,
      query,
      headers
    });
  }

  /**
   * POST HTTP resource
   * @param {any} url HTTP url of the resource
   * @param {any} query HTTP URL query parameters
   * @param {any} payload HTTP request payload
   * @param {any} headers HTTP request headers
   * @memberof HttpServiceClass
   */
  async post ({ url, query, payload, headers } = {}) {
    return await this.fetch({
      method: 'POST',
      url,
      query,
      payload,
      headers
    });
  }

}

/**
 * HTTP response
 * @export
 * @class HttpResponse
 */
export class HttpResponse {
  /**
   * Creates an instance of HttpResponse.
   * @param {any} code Response HTTP code
   * @param {any} headers Response HTTP headers
   * @memberof HttpResponse
   */
  constructor ({ code, headers } = {}) {
    this.code = code;
    this.headers = headers;
  }
}
/**
 * Successful HTTP response
 * @export
 * @class HttpSuccessResponse
 */
export class HttpSuccessResponse extends HttpResponse {
  /**
   * Creates an instance of HttpSuccessResponse.
   * @param {any} code Response HTTP code
   * @param {any} headers Response HTTP headers
   * @param {any} body Response HTTP body
   * @memberof HttpSuccessResponse
   */
  constructor ({ code, headers, data } = {}) {
    super({ code, headers });
    this.data = data;
  }
}
/**
 * Failed HTTP response
 * @export
 * @class HttpErrorResponse
 */
export class HttpErrorResponse extends HttpResponse {
  /**
   * Creates an instance of HttpErrorResponse.
   * @param {any} code Response HTTP code
   * @param {any} headers Response HTTP headers
   * @param {any} error Response HTTP error
   * @memberof HttpErrorResponse
   */
  constructor ({ code, headers, error } = {}) {
    super({ code, headers });
    this.error = error;
  }
}
