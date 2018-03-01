import {getUser} from "src/crud/user/user";

export const UserName = (userId) => {
  const handleResult = (res) => {
    return res.first_name + ' '+ res.last_name
  };
  getUser(userId, handleResult);
};

export const UserUsername = (userId) => {
  const handleResult = (res) => {
    return res.username;
  };
  getUser(userId, handleResult);
};