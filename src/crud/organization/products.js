import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN,IDENTITY_ID} from '../../consts/data'

export const updateProduct = (formValues, productId, updateStateForView, hideEdit) => {
	let isLoading = false;
	
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "patch",
				url: `${url}/products/${productId}/`,
				result: `updateProduct-organization-patch/${productId}`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`updateProduct-organization-patch/${productId}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
		}else{
			if(formValues.picture_media !=null){
				addPicture(formValues.picture_media, res.id)
			}
		}
	
		updateStateForView(res.data, error, isLoading);
		hideEdit();
	});
};

export const createProduct = (formValues, updateStateForView, hideEdit) => {
	let isLoading = false;
	formValues.product_owner = IDENTITY_ID;
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "post",
				url: `${url}/products/`,
				result: `createProduct-organization-post/`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`createProduct-organization-post/`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
		}else{
			if(formValues.picture_media !=null){
				addPicture(formValues.picture_media, res.id)
			}
		}
		
		updateStateForView(res.data, error, isLoading);
		hideEdit();
	});
};

export const deleteProduct = (product, products, updateStateForView) => {
	let isLoading = false;
	let productId = product.id;
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "del",
				url: `${url}/products/${productId}/`,
				result: `deleteProduct-organization-delete/${productId}`,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`deleteProduct-organization-delete/${productId}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
		}


		//TODO delete pictures assosiated to this product
		socket.emit(REST_REQUEST,
			{
				method: "del",
				url: `${url}/products/pictures/?picture_prodcut=${productId}`,
				result: `Product-pictures-del/${productId}`,
				token: TOKEN,
			}
		);

		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/products/?product_owner=${IDENTITY_ID}`,
				result: `Products-get/${IDENTITY_ID}`,
				token: TOKEN,
			}
		);

		updateStateForView(res.data, error, isLoading);
	});
};

export const deletePicture = ( pictures, picture, updatePicturesList) => {
	let isLoading = false;
	
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "del",
				url: `${url}/products/pictures/${picture.id}`,
				result: `Product-picture-del/${picture.id}`,
				token: TOKEN,
			}
		);
	};

	emitting();

	socket.on(`Product-picture-del/${picture.id}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
		}
		const deletedIndex = pictures.indexOf(picture);
    updatePicturesList(null, 'del', deletedIndex);

		socket.off(`Product-picture-del/${picture.id}`);
	});
}

export const addPicture = (picture_media, picture_product) => {
	let isLoading = false;
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "post",
				url: `${url}/products/pictures/`,
				result: `Product-picture-add`,
				data: {picture_media:picture_media, picture_product:picture_product},
				token: TOKEN,
			}
		);
	};

	emitting();

	socket.on(`Product-picture-add`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
		}

		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/products/pictures/?pictures_product=${picture_product}`,
				result: `Product-pictures-get`,
				token: TOKEN,
			}
		);

		socket.off(`Product-picture-add`);
	});
}