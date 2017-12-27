// =====================================================================================================================
// GitHub service
// =====================================================================================================================

// Dependencies
import _ from 'lodash';
import { HttpSuccessResponse, HttpErrorResponse } from '../../../../common/script/services';
import { Configuration } from '../';
import { GitHubRepositoryTree } from './data';

// Holds loaded repository
let repo = new GitHubRepositoryTree();

/**
 * Provides data fetching from GitHub API
 * @export
 * @class GitHubServiceClass
 */
export class GitHubServiceClass {

  /**
   * GitHub API response caching timeout (in [ms])
   * @readonly
   * @static
   * @memberof GitHubServiceClass
   */
  static get GitHubApiCachingTimeout () { return 5 * 60 * 1000; }
  /**
   * GutHub API domain URL
   * @readonly
   * @static
   * @memberof GitHubServiceClass
   */
  static get GitHubApiDomain () { return 'https://api.github.com'; }
  /**
   * GutHub RAW content domain URL
   * @readonly
   * @static
   * @memberof GitHubServiceClass
   */
  static get GitHubRawDomain () { return 'https://raw.githubusercontent.com'; }

  /**
   * Creates an instance of GitHubServiceClass
   * @param {any} cachingService Instance of Caching service
   * @param {any} httpService Instance of HTTP service
   * @memberof GitHubServiceClass
   */
  constructor (cachingService, httpService) {
    this.cachingService = cachingService;
    this.httpService = httpService;
  }

  /**
   * Loaded repository tree instance
   * @readonly
   * @memberof GitHubServiceClass
   */
  get tree () { return repo; }

  /**
   * Loads GitHub repository tree structure
   * @param {any} username Optional GitHUb username (if not present, configuration value will be used)
   * @param {any} repository Optional GitHUb repository (if not present, configuration value will be used)
   * @param {any} branch Optional GitHUb branch (if not present, configuration value will be used)
   * @memberof GitHubServiceClass
   */
  async initialize ({ username, repository, branch } = {}) {
    // Check if repo tree structure cached
    const treeData = this.cachingService.get('repoTree');
    if (!_.isNil(treeData)) {

      // Return repo tree
      repo = new GitHubRepositoryTree(treeData);

    } else {

      // Fetch latest commit
      const commitSHAs = await this.fetchRepositoryCommits();
      if (commitSHAs && commitSHAs.length) {

        // Fetch repo tree
        const treeData = await this.fetchRepositoryTree({ sha: commitSHAs[0] });
        // Cache repo tree
        this.cachingService.set('repoTree', treeData, { timeout: GitHubServiceClass.GitHubApiCachingTimeout });
        // Return repo tree
        repo = new GitHubRepositoryTree(treeData);

      } else {

        // Cache repo tree
        this.cachingService.set('repoTree', false, { timeout: GitHubServiceClass.GitHubApiCachingTimeout });
        // Return empty repo tree
        repo = new GitHubRepositoryTree();

      }

    }
  }

  /**
   * Fetches repository commits
   * @param {any} username Optional GitHUb username (if not present, configuration value will be used)
   * @param {any} repository Optional GitHUb repository (if not present, configuration value will be used)
   * @param {any} branch Optional GitHUb branch (if not present, configuration value will be used)
   * @returns {any} Array of commit SHA values
   * @memberof GitHubServiceClass
   */
  async fetchRepositoryCommits ({ username, repository, branch } = {}) {
    // Initialize GitHub API request
    const url = `${ GitHubServiceClass.GitHubApiDomain }/repos/${ username || Configuration.GithubUsername }/${ repository || Configuration.GithubRepository }/commits`,
          query = { sha: (branch || Configuration.GithubBranch) };
    // Execute GitHub API request
    const res = await this.httpService.get({ url, query });
    // Check response
    if (res instanceof HttpSuccessResponse) {
      // Extract and return commit SHA values
      return _.map(res.data, (commit) => { return commit.sha; });
    } else {
      // Prompt error (TODO: pretify error handling)
      console.error(res);
    }
  }

  /**
   * Fetches repository tree
   * @param {any} username Optional GitHUb username (if not present, configuration value will be used)
   * @param {any} repository Optional GitHUb repository (if not present, configuration value will be used)
   * @param {any} branch Optional GitHUb branch (if not present, configuration value will be used)
   * @param {any} sha Optional GitHUb commit sha (if not present, configuration value will be used)
   * @returns {any} Contents of the requested repository
   * @memberof GitHubServiceClass
   */
  async fetchRepositoryTree ({ username, repository, branch, sha } = {}) {
    // Initialize GitHub API request
    const url = `${ GitHubServiceClass.GitHubApiDomain }/repos/${ username || Configuration.GithubUsername }/${ repository || Configuration.GithubRepository }/git/trees/${ sha }`,
          query = { recursive: 1 };
    // Execute GitHub API request
    const res = await this.httpService.get({ url, query });
    // Check response
    if (res instanceof HttpSuccessResponse) {
      // Return a GitHub repository tree data
      return res.data;
    } else {
      // Prompt error (TODO: pretify error handling)
      console.error(res);
    }
  }

  /**
   * Fetches content of a file resource from GitHub repository
   * @param {any} path Path of the resource
   * @param {any} username Optional GitHUb username (if not present, configuration value will be used)
   * @param {any} repository Optional GitHUb repository (if not present, configuration value will be used)
   * @param {any} sha Optional GitHUb tree/commit sha (if not present, configuration value will be used)
   * @returns {any} Content of the requested file resource
   * @memberof GitHubServiceClass
   */
  async fetchResource (path, { username, repository, sha } = {}) {
    // Process path
    if (path && path.length && path[0] === '/') { path = path.substr(1); }
    // Initialize GitHub content request
    const url = `${ GitHubServiceClass.GitHubRawDomain }/${ username || Configuration.GithubUsername }/${ repository || Configuration.GithubRepository }/${ sha || this.tree.sha }/${ path }`;
    // Execute GitHub content request
    const res = await this.httpService.get({ url });
    // Return fetched file content
    return res.data;
  }

  // https://raw.githubusercontent.com/ofzza/repo2web-test-content/5e0301420fad6601037131315b87455eaa41a395/articles/music/i-play-the-drums.md

}
