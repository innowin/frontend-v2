import Client from 'clientjs'
import FingerPrint from 'fingerprintjs2'
import client from 'src/consts/client'

const user = new Client()
const FP = new FingerPrint()

export const clientData = () => {
	const data = user.getResult()
	const {
		browser: {name: browser_name, version: browser_version},
		engine: {name: browser_engine, version: browser_engine_version},
		cpu: {architecture: device_cpu},
		device: {vendor: device_vendor, type: device_type},
			os: {name: device_os , version: device_os_version},
		ua:device_agent
	} = data
	console.log('data is : ',data)
	let resultList = {
		"language": "language",
		"color_depth": "device_color_depth",
		"device_memory": "device_memory",
		"resolution": "device_current_screen_resolution",
		"timezone_offset": "timezone_offset",
		"adblock": "adblock",
		"touch_support": "touch_support",
		// "regular_plugins": "browser_plugins",
		"has_lied_languages": "has_lied_languages",
		"has_lied_resolution": "has_lied_resolution",
		"has_lied_os": "has_lied_os",
		"has_lied_browser": "has_lied_browser",
	}
	let result = {
		browser_name,
		browser_version,
		browser_engine,
		browser_engine_version,
		device_type,
		device_vendor,
		device_os,
		device_os_version,
		device_cpu,
		device_agent,
	}
	FP.get((fp, comp) => {
		result["fingerprint"] = fp
		result["device_user"] = client.getUserId()
		comp.map(el => {
			if (el.key in resultList) {
				result[resultList[el.key]] = el.value;
				if (el.key === "resolution" ||el.key === "touch_support" || el.key === "timezone_offset" ) {
					result[resultList[el.key]] = el.value.toString()
				}
			}
		})
	})
	
	return result
}

// componentDidCatch(error, errorInfo) {
// 	this.setState({ error });
// 	Raven.captureException(error, { extra: errorInfo });
// }
// export const log = ex => {
// 	Raven.captureException(ex, {
// 		extra: client.getToken()
// 	})
// 	/*eslint no-console:0*/
// 	window.console && console.error && console.error(ex)
// 	throw new Error(ex)
// }
