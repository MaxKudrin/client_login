import axios from "axios";
import {usersUrl} from "../../config";
import {GET_USERS, GET_USERS_ERROR, LOGOUT} from "./actionTypes";

export function getUsers() {
  return async (dispatch, getState) => {
    try {
      const {token} = getState().auth;
      const response = await axios.post(usersUrl, null, {
        headers: {Authorization: `Bearer ${token}`},
      });
      const users = response.data.map((user) => {
        return {id: user._id, username: user.username, password: user.password};
      });
      dispatch({type: GET_USERS, payload: users});
    } catch (error) {
      const errorMsg = error.response.data.errorMessage.toLowerCase();
      dispatch({type: GET_USERS_ERROR, payload: errorMsg});
    }
  };
}
export function usersLogout() {
  return {type: LOGOUT};
}
