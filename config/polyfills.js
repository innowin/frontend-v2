'use strict';

import configureMockStore from "redux-mock-store";

/********** creating global variables for tests *************/
// let _shallowRenderer = require('react-test-renderer/shallow');
//Adding react-redux provider for connected components
global.Provider =  require("react-redux").Provider;
//creating a mock store for connected components
const mockStore = configureMockStore();
global.store = mockStore({});
//Adding React
global.React = require('react')
//Adding normal renderer to global of node
global.renderer = require('react-test-renderer')
//Adding shallow renderer to global of node
// global.shallowRenderer = new _shallowRenderer();


if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global);
}
