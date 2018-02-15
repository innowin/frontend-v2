import {REST_REQUEST} from "../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {ID, TOKEN} from "../../consts/data"

export const getCertificates = (userId, updateCertificates, handleErrorLoading) => {

  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/users/certificates/?certificate_user=${userId}`,
      result: `UserCertificates-get/${userId}`,
      token: TOKEN,
    }
  );

  socket.on(`UserCertificates-get/${userId}`, (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail);
      return false;
    }
    updateCertificates(res, 'get');
    handleErrorLoading();
  });
};

export const updateCertificate = (formValues, certificateId, updateView, hideEdit, handleErrorLoading) => {
  socket.emit(REST_REQUEST,
    {
      method: "patch",
      url: `${url}/users/certificates/${certificateId}/`,
      result: `updateCertificate-patch/${certificateId}`,
      data: formValues,
      token: TOKEN
    }
  );

  socket.on(`updateCertificate-patch/${certificateId}`, (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail);
      return false;
    }
    updateView(res);
    handleErrorLoading();
    hideEdit();
  });
};

export const createCertificate = (formValues, updateCertificates, handleErrorLoading, hideCreateForm) => {
    socket.emit(REST_REQUEST,
      {
        method: "post",
        url: `${url}/users/certificates/`,
        result: "createCertificate-post",
        data: {...formValues, certificate_user:ID},
        token: TOKEN
      }
    );

    socket.on("createCertificate-post", (res) => {
      if (res.detail) {
        handleErrorLoading(res.detail);
        return false;
      }
      updateCertificates(res, 'post');
      handleErrorLoading();
      hideCreateForm();
    });
  }
;

export const deleteCertificate = (certificates, certificate, updateCertificates, hideEdit, handleErrorLoading) => {
  const certificateId = certificate.id;
  socket.emit(REST_REQUEST,
    {
      method: "delete",
      url: `${url}/users/certificates/${certificateId}/`,
      result: `deleteCertificate-delete/${certificateId}`,
      token: TOKEN
    }
  );


  socket.on(`deleteCertificate-delete/${certificateId}`, (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail);
      return false;
    }
    const deletedIndex = certificates.indexOf(certificate);
    updateCertificates(null, 'del', deletedIndex);
    handleErrorLoading();
    hideEdit();
  });
};