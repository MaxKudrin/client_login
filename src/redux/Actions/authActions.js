import {
  AUTH_CHANGE_HANDLER,
  AUTH_REGISTER_START,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR,
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
} from "./actionTypes";
import {loginUrl, registerUrl} from "../../config";
import axios from "axios";

export function authChangeHandler(e) {
  return (dispatch, getState) => {
    const {value, name} = e.target;
    const controlsCopy = [...getState().auth.controls];
    const newControls = controlsCopy.map((control) => {
      if (control.name === name) {
        control.value = value;
        control.touched = true;
        const validation = controlValidate(control.validation, control.value);
        control.valid = validation.valid;
        control.errorMessage = validation.errorMessage;
      }
      return control;
    });

    dispatch({type: AUTH_CHANGE_HANDLER, payload: newControls});
  };
}

export function register() {
  return async (dispatch, getState) => {
    try {
      dispatch({type: AUTH_REGISTER_START});
      const [username, password] = getState().auth.controls.map(
        (control) => control.value
      );
      const data = {username, password};
      const response = await axios.post(registerUrl, data);
      console.log(response);
      dispatch({type: AUTH_REGISTER_SUCCESS});
    } catch (error) {
      const {errorMessage, param} = error.response.data;
      const controlsCopy = [...getState().auth.controls];
      const newControls = controlsCopy.map((control) => {
        if (control.name === param) {
          control.errorMessage = errorMessage;
          control.valid = false;
        }
        return control;
      });
      dispatch({
        type: AUTH_REGISTER_ERROR,
        payload: newControls,
      });
    }
  };
}

export function login() {
  return async (dispatch, getState) => {
    try {
      dispatch({type: AUTH_LOGIN_START});
      const [username, password] = getState().auth.controls.map(
        (control) => control.value
      );
      const data = {username, password};
      const response = await axios.post(loginUrl, data);
      const {token} = response.data;
      dispatch(authLoginSuccess(token));
    } catch (error) {
      dispatch(authLoginError());
    }
  };
}

function authLoginSuccess(token) {
  localStorage.setItem("token", token);
  return {type: AUTH_LOGIN_SUCCESS, payload: token};
}
function authLoginError() {
  return {type: AUTH_LOGIN_ERROR};
}

export function autoLogin() {
  return (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(authLoginSuccess(token));
      } else {
        dispatch(authLoginError());
      }
    } catch (error) {
      dispatch(authLoginError());
    }
  };
}

function controlValidate(validation, value) {
  let isValid = true;
  if (validation.required) {
    if (value.trim() === "")
      return {valid: false, errorMessage: `Field can't be empty`};
  }
  if (validation.length) {
    if (validation.length.min) {
      isValid = value.length >= validation.length.min && isValid;
      if (!isValid)
        return {
          valid: false,
          errorMessage: `Minimum password length is ${validation.length.min}`,
        };
    }
    if (validation.length.max) {
      isValid = value.length <= validation.length.max && isValid;
      if (!isValid)
        return {
          valid: false,
          errorMessage: `Maximum password length is ${validation.length.max}`,
        };
    }
  }
  return {valid: isValid, errorMessage: null};
}
