import {REST_REQUEST} from "../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {TOKEN, ID} from "src/consts/data"

export const updateEducation = (educationId, formValues,handleResult) =>{
  socket.emit(REST_REQUEST,
  {
    method:'patch',
    url:`${url}/users/educations/${educationId}/`,
    data:formValues,
    result:`user-education-update/${educationId}`,
    token:TOKEN
  });

  socket.on(`user-education-update/${educationId}`,(res)=>{
    if(res.detail){
      handleResult( {error:true,detail:res.detail});
    }else{
      handleResult(res);
    }
  })
};

export const createEducation = (formValues, handleResult) =>{
  formValues.education_user = ID;
  socket.emit(REST_REQUEST,
    {
      method:'post',
      url:`${url}/users/educations/`,
      data:formValues,
      result:`user-education-create/`,
      token:TOKEN
    });

  socket.on(`user-education-create/`,(res)=>{
    if(res.detail){
      handleResult( {error:true,detail:res.detail});
    }else{
      handleResult(res);
    }
  })
};

export const deleteEducation = (educationId, formValues, handleResult) =>{
  socket.emit(REST_REQUEST,
    {
      method:'del',
      url:`${url}/users/educations/${educationId}/`,
      data:formValues,
      result:`user-education-del/${educationId}`,
      token:TOKEN
    });
  
    socket.on(`user-education-del/${educationId}`,(res)=>{
      if(res.detail){
        handleResult( {error:true,detail:res.detail});
      }else{
        handleResult(res);
      }
    })
};

//---------------------------------------------------------------------//

export const updateResearch = (researchId, formValues, handleResult) =>{
  socket.emit(REST_REQUEST,
    {
      method:'patch',
      url:`${url}/users/researches/${researchId}/`,
      data:formValues,
      result:`user-research-update/${researchId}`,
      token:TOKEN
    });

  socket.on(`user-research-update/${researchId}`,(res)=>{
    if(res.detail){
      handleResult( {error:true,detail:res.detail});
    }else{
      handleResult(res);
    }
  })
};

export const createResearch = (researchId, formValues, handleResult) =>{
  formValues.education_user = ID;
  socket.emit(REST_REQUEST,
    {
      method:'post',
      url:`${url}/users/researches/${researchId}`,
      data:formValues,
      result:`user-research-create/${researchId}`,
      token:TOKEN
    });

  socket.on(`user-research-create/${researchId}`,(res)=>{
    if(res.detail){
      handleResult( {error:true,detail:res.detail});
    }else{
      handleResult(res);
    }
  })
};

export const deleteResearch = (researchId, formValues, handleResult) =>{
  socket.emit(REST_REQUEST,
    {
      method:'del',
      url:`${url}/users/researches/${researchId}/`,
      data:formValues,
      result:`user-research-del/${researchId}`,
      token:TOKEN
    });
  
    socket.on(`user-research-del/${researchId}`,(res)=>{
      if(res.detail){
        handleResult( {error:true,detail:res.detail});
      }else{
        handleResult(res);
      }
    })
};

//---------------------------------------------------------------------//

export const getUserEducations = (userId, handleResult) =>{
  socket.emit(REST_REQUEST, 
    {
    method: "get",
    url:`${url}/users/educations/?education_user=${userId}`,
    result: `/users/educations/get${userId}`,
    token: TOKEN,
    }
  );

  socket.on(`/users/educations/get${userId}`,(res)=>{
    if(res.detail) {
      handleResult( {error:true,detail:res.detail});
    }
    handleResult(res);
  })
};

export const getUserResearches = (userId, handleResult) =>{
  socket.emit(REST_REQUEST, 
    {
    method: "get",
    url:`${url}/users/researches/`,
    result: "/users/researches/get",
    token: TOKEN,
    }
  );

  socket.on("/users/researches/get",(res)=>{
    if(res.detail) {
      handleResult( {error:true,detail:res.detail});
    }
    handleResult(res);
  })
};

export const getUser = (userId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/users/${userId}/`,
      result: `/users/{id}/-get/getUser/${userId}`,
      token: TOKEN,
    }
  );

  const func = (res) => {
    if (res.detail) {
      // TODO mohsen: handle error
      return false
    }
    handleResult(res);
    s_off()
  };

  socket.on(`/users/{id}/-get/getUser/${userId}`,func);

  function s_off() {
    socket.off(`/users/{id}/-get/getUser/${userId}`, func)
  }
};



export const updateUser = (formValues, userId, updateStateForView, hideEdit) => {
  let isLoading = false;
  const emitting = () => {
    isLoading = true;
    socket.emit(REST_REQUEST, {
      method: "patch",
      url: `${url}/users/${userId}/`,
      result: `updateUser-patch-${userId}`,
      token: TOKEN,
      data: {
        "username": formValues.username,
        "first_name": formValues.first_name,
        "last_name": formValues.last_name,
        "email": formValues.email,
      }
    })
  };

  emitting();

  socket.on(`updateUser-patch-${userId}`, (res) => {
    let error = false;
    isLoading = false;
    if (res.detail) {
      error = res.detail;
    }
    updateStateForView(res, error, isLoading);
    hideEdit();
  });
};

export const updateProfile = (formValues, profileId, updateStateForView, hideEdit) => {
  let isLoading = false;
  const emitting = () => {
    isLoading = true;
    socket.emit(REST_REQUEST, {
      method: "patch",
      url: `${url}/users/profiles/${profileId}/`,
      result: `updateProfile-patch-${profileId}`,
      token: TOKEN,
      data: {
        "public_email": formValues.public_email,
        "national_code": formValues.national_code,
        "birth_date": formValues.birth_date,
        "web_site": formValues.web_site,
        "phone": formValues.phone,
        "mobile": formValues.mobile,
        "fax": formValues.fax,
        "telegram_account": formValues.telegram_account,
        "description": formValues.description,
        "profile_user": formValues.profile_user
      }
    })
  };

  emitting();

  socket.on(`updateProfile-patch-${profileId}`, (res) => {
    let error = false;
    isLoading = false;
    if (res.detail) {
      error = res.detail;
    }
    updateStateForView(res, error, isLoading);
    hideEdit();
  });
};