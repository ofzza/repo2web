// =====================================================================================================================
// Client-side entry point
// =====================================================================================================================

// Dependencies
import _ from 'lodash';
import $ from 'jquery';
import { ConfigurationService, GitHubService, RouterService } from './script/services';

// Wait for page load event
$(document).ready(async () => {
  try {

    // Initialize config
    await ConfigurationService.initialize();
    // Fetch GituUb repository
    await GitHubService.initialize();
    // Initialize routing
    await RouterService.init({
      hash: true
    });

  } catch (err) {
    console.error(err);
  }
});
