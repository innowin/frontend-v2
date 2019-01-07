import ReactGA from 'react-ga'
import client from "src/consts/client"

const gaInitialize = (identityId) => {
	ReactGA.initialize([{
		trackingId: 'UA-131132227-1',
		gaOptions: {
			siteSpeedSampleRate: 100,
			name: 'innowin1',
			userId: identityId,
		}
	}
// 	{
// 	trackingId: 'UA-000000-02',
// 	gaOptions: { name: 'tracker2' }
// }
	], { debug: false, alwaysSendToDefaultTracker: false })
}

function init() {
	let identityId = client.getIdentityId()
	let userType = client.getUserType()
	gaInitialize(identityId,userType)
}
export default init