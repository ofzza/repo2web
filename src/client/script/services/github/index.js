// =====================================================================================================================
// GitHub service
// =====================================================================================================================

// Dependencies
import { GitHubServiceClass as GitHubServiceBase } from '../../../../common/script/services';
import { CachingService, HttpService } from '../';

/**
 * Provides data fetching from GitHub API
 * @export
 * @class GitHubServiceClass
 */
export class GitHubServiceClass extends GitHubServiceBase  {
  constructor () {
    super(CachingService, HttpService);
  }
}

// Export GitHub service singleton instance
const gitHubService = new GitHubServiceClass();
export default gitHubService;
