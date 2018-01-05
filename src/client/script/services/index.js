// =====================================================================================================================
// Client-side services central repository
// =====================================================================================================================

// General services
export { default as ConfigurationService, ConfigurationServiceClass } from './config';
export { default as CachingService, CachingServiceClass } from './cache';
export { default as HttpService, HttpServiceClass } from './http';
export { default as GitHubService, GitHubServiceClass } from './github';
export { default as DomService, DomClass } from './dom';
export { default as RouterService, RouterServiceClass } from './router';

// Rendering
export { default as Renderer } from './render';
export { default as NullRenderer } from './render/render-null';
export { default as FileRenderer } from './render/render-file';
export { default as DirectoryRenderer } from './render/render-directory';
