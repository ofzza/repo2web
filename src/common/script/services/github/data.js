// =====================================================================================================================
// GitHub data
// =====================================================================================================================

// Dependencies
import _ from 'lodash';

/**
 * GitHub repository item representation
 * @class GitHubRepositoryResource
 */
export class GitHubRepositoryResource {
  /**
   * Creates an instance of GitHubRepositoryItem.
   * @param {any} name Item name
   * @param {any} sha Item SHA
   * @param {any} url Item URL
   * @param {any} parent Reference to parent resource
   * @memberof GitHubRepositoryResource
   */
  constructor ({ name, sha, url, parent = null } = {}) {
    // Set properties
    this.parent = parent;
    this.name = name;
    this.sha = sha;
    this.url = url;
  }

  /**
   * Composes full resource path
   * @readonly
   * @memberof GitHubRepositoryResource
   */
  get path () {
    // Get all parents and compose path
    let parent = this.parent,
        path = [];
    while (parent) {
      if (parent.name) { path.push(parent.name); }
      parent = parent.parent;
    }
    // Return full path
    return `${ _.reverse(path).join('/') }/${ this.name }`;
  }

}
/**
 * GitHub repository Directory representation
 * @class GitHubRepositoryDirectory
 */
export class GitHubRepositoryDirectory extends GitHubRepositoryResource {
  /**
   * Creates an instance of GitHubRepositoryDirectory.
   * @param {any} name Directory name
   * @param {any} res Partial response from HTTP call to GitHub API's repo tree endpoint
   * @param {any} parent Reference to parent resource
   * @memberof GitHubRepositoryDirectory
   */
  constructor ({ name, res, parent = null } = {}) {
    super({ name: name || null, parent });

    // Set SHA and url
    let currentDirectoryResource = _.find(res, (item) => { return !item.path; });
    if (currentDirectoryResource) {
      _.remove(res, (item) => { return !item.path; });
      this.sha = currentDirectoryResource.sha;
      this.url = currentDirectoryResource.url;
    }

    // Store direct child files
    this.children = _.reduce(res, (children, item) => {
      // Parse item's path
      let path = item.path.split('/');
      // Check item type
      if (path.length === 1 && item.type === 'blob') {
        // Store direct child file
        children.push(new GitHubRepositoryFile({ res: item, parent: this }));
      }
      // Return children
      return children;
    }, []);

    // Sort direct child directories
    let dirs = _.reduce(res, (dirs, item) => {
      // Parse item's path
      let path = item.path.split('/');
      // Check item type
      if ((path.length === 1 && item.type === 'tree') || path.length > 1) {
        // Check if first level directory alrady registered
        if (!dirs[path[0]]) { dirs[path[0]] = []; }
        dirs[path[0]].push(_.merge({}, item, { path: path.slice(1).join('/') }));
      }
      // Return sorted dirs
      return dirs;
    }, {});
    // Store direct child directories
    _.forEach(dirs, (res, name) => {
      this.children.push(new GitHubRepositoryDirectory({ name, res, parent: this }));
    });

  }
}
/**
 * GitHub repository File representation
 * @class GitHubRepositoryFile
 */
export class GitHubRepositoryFile extends GitHubRepositoryResource {
  /**
   * Creates an instance of GitHubRepositoryFile.
   * @param {any} res Partial response from HTTP call to GitHub API's repo tree endpoint
   * @param {any} parent Reference to parent resource
   * @memberof GitHubRepositoryFile
   */
  constructor ({ res, parent = null } = {}) {
    super({
      parent,
      name: _.last(res.path.split('/')),
      sha: res.sha,
      url: res.url
    });

    // Store properties
    this.size = res.size;
  }
}

/**
 * GitHub repository Full tree structure representation
 * @class GitHubRepositoryTree
 */
export class GitHubRepositoryTree extends GitHubRepositoryDirectory {

  /**
   * Creates an instance of GitHubRepositoryTree.
   * @param {any} res Response from HTTP call to GitHub API's repo tree endpoint:
   *                  https://api.github.com/repos/:username/:repo/git/trees/:commitSHA?recursive=1
   * @memberof GitHubRepositoryTree
   */
  constructor (res) {
    super({ res: (res ? res.tree : []) });

    // Set SHA and url
    if (res) {
      this.sha = res.sha;
      this.url = res.url;
    }
  }

  /**
   * Searches for a repository resource by it's path
   * @param {any} path Resource path
   * @returns {any} Matching resource if found
   * @memberof GitHubRepositoryTree
   */
  find (path) {

    // Process path
    if (path && path.length && path[0] === '/') { path = path.substr(1); }

    // Check if path
    if (!path) { return this; }

    // Split path
    let parsedPath = path.split('/'),
        currentResource = this;

    // Search for resource
    while (parsedPath.length) {
      // Check if next part of path matches a resource
      let resource = _.find(currentResource.children, (child) => { return (child.name === parsedPath[0]); });
      if (resource) {

        // Check if resource is a file or directory
        if (resource instanceof GitHubRepositoryFile) {

          // Return matched file resource
          return resource;

        } else if (resource instanceof GitHubRepositoryDirectory && parsedPath.length === 1) {

          // Return matched directory resource
          return resource;

        } else if (resource instanceof GitHubRepositoryDirectory && parsedPath.length > 1) {

          // Keep looking into directory resource
          currentResource = resource;
          parsedPath.splice(0, 1);

        }

      } else {

        // No resource matches path
        return;

      }
    }

  }

}
