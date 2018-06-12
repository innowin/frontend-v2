import {ID, TOKEN} from "../../consts/data";
import {REST_REQUEST} from "../../consts/Events";
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS";

export const createResearch = (researchId, formValues, handleResult) => {
  formValues.education_user = ID;
  socket.emit(REST_REQUEST,
    {
      method: 'post',
      url: `${url}/users/researches/${researchId}`,
      data: formValues,
      result: `user-research-create/${researchId}`,
      token: TOKEN
    });

  socket.on(`user-research-create/${researchId}`, (res) => {
    if (res.detail) {
      handleResult({error: true, detail: res.detail});
    } else {
      handleResult(res);
    }
  })
};

export const updateResearch = (researchId, formValues, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: 'patch',
      url: `${url}/users/researches/${researchId}/`,
      data: formValues,
      result: `user-research-update/${researchId}`,
      token: TOKEN
    });

  socket.on(`user-research-update/${researchId}`, (res) => {
    if (res.detail) {
      handleResult({error: true, detail: res.detail});
    } else {
      handleResult(res);
    }
  })
};

export const deleteResearch = (researchId, formValues, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: 'del',
      url: `${url}/users/researches/${researchId}/`,
      data: formValues,
      result: `user-research-del/${researchId}`,
      token: TOKEN
    });

  socket.on(`user-research-del/${researchId}`, (res) => {
    if (res.detail) {
      handleResult({error: true, detail: res.detail});
    } else {
      handleResult(res);
    }
  })
};

export const getUserResearches = (userId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/users/researches/`,
      result: "/users/researches/get",
      token: TOKEN,
    }
  );

  socket.on("/users/researches/get", (res) => {
    if (res.detail) {
      handleResult({error: true, detail: res.detail});
    }
    handleResult(res);
  })
};