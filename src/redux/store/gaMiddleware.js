import ReactGA from 'react-ga'

const trackPage = page => {
	ReactGA.pageview(page,['innowin1']);
};

const gaMiddleware = store => next => action => {
	if (action.type === '@@router/LOCATION_CHANGE') {
		const nextPage = `${action.payload.pathname}${action.payload.search}`;
		trackPage(nextPage);
	}
	return next(action);
}

export default gaMiddleware