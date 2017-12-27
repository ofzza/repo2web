// =====================================================================================================================
// Client-side entry point
// =====================================================================================================================

// Dependencies
import _ from 'lodash';
import $ from 'jquery';
import showdown from 'showdown';
import { ConfigurationService, GitHubService } from './script/services';
import { GitHubRepositoryDirectory, GitHubRepositoryFile } from '../common/script/services/github/data';

// Wait for page load event
$(document).ready(async () => {
  try {

    // Initialize config
    await ConfigurationService.initialize();
    // Fetch GituUb repository
    await GitHubService.initialize();
    console.log('REPO:', GitHubService.tree);

    // Router(ish)
    const converter = new showdown.Converter();
    async function handleLocationChange () {
      let parsedLocation = window.location.href.split('#'),
          path = (parsedLocation.length > 1 ? parsedLocation[1] : null),
          resource = GitHubService.tree.find(path);
      if (!resource) {
        document.getElementById('target').innerHTML = 'Resource not found!';
      } else if (resource instanceof GitHubRepositoryDirectory) {
        document.getElementById('target').innerHTML = 'Resource is a directory!';
      } else if (resource instanceof GitHubRepositoryFile) {
        let md = await GitHubService.fetchResource(path),
            html = converter.makeHtml(md);
        document.getElementById('target').innerHTML = html;
      }
      console.log('> Loc', path, resource);
    };
    await handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);

  } catch (err) {
    console.error(err);
  }
});
