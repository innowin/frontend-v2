import {REST_REQUEST} from "../../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"

export const updateUser = ({formValues, userId}) => {
    socket.emit(REST_REQUEST, {
        method: "patch",
        url: url + `/users/${userId}/`,
        result: `updateUser-patch-${userId}`,
        token: "",
    });

    // TODO mohsen: check username is not already exist when change
    socket.on(`updateUser-patch-${userId}`, (res) => {
        console.log('patched user: ', res);
    });
};

export const updateProfile = (formValues, profileId) => {
    socket.emit(REST_REQUEST, {
        method: "patch",
        url: url + `/users/profiles/${profileId}/`,
        result: `updateProfile-patch-${profileId}`,
        token: "",
    });

    // TODO mohsen: check username is not already exist when change
    socket.on(`updateProfile-patch-${profileId}`, (res) => {
        console.log('patched profile: ', res);
    });
};