import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const updateProduct = (formValues, productId, updateStateForView, hideEdit) => {
	let isLoading = false;
	console.log(TOKEN);
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
				{
					method: "patch",
					url: `${url}/products/${productId}/`,
					result: `updateBasicInformation-patch/${productId}`,
					data :formValues,
					token: TOKEN
				}
		);
	};
	
	emitting(); 
	
	socket.on(`updateBasicInformation-patch/${productId}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.data.detail) {
			error = res.data.detail;
		}
		updateStateForView(res.data, error, isLoading);
		hideEdit();
	});
};