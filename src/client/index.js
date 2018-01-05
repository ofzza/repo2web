// =====================================================================================================================
// Client-side entry point
// =====================================================================================================================

// Dependencies
import _ from 'lodash';
import $ from 'jquery';
import { ConfigurationService, GitHubService, RouterService, DomService } from './script/services';

// Wait for page load event
$(document).ready(async () => {
  try {

    // Initialize config
    await ConfigurationService.initialize();
    // Fetch GituUb repository
    await GitHubService.initialize();
    // Initialize DOM monitoring
    await DomService.initialize();
    // Initialize routing
    await RouterService.initialize({
      hash: true
    });

  } catch (err) {
    console.error(err);
  }
});
