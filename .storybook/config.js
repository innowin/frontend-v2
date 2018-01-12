import { configure } from '@storybook/react';
import '@storybook/addon-console';
//import 'storybook-addon-i18n-tools';


// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
// const reqStyle = require.context('../src/styles',true,/.global.scss$/);
function loadStories() {
	req.keys().forEach((filename) => req(filename));
	// reqStyle.keys().forEach((filename) => req(filename));
	require('src/styles/global.scss');
}

configure(loadStories, module);
