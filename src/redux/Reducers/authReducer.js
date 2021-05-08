import {
  AUTH_CHANGE_HANDLER,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_ERROR,
  LOGOUT,
} from "../Actions/actionTypes";

const initialStore = {
  controls: [
    {
      name: "username",
      label: "Username",
      touched: false,
      errorMessage: null,
      valid: false,
      autoFocus: true,
      value: "",
      validation: {required: true},
    },
    {
      name: "password",
      label: "Password",
      touched: false,
      errorMessage: null,
      valid: false,
      autoFocus: false,
      value: "",
      validation: {required: true, length: {min: 4, max: 10}},
    },
  ],
  token: null,
};

export default function authReducer(store = initialStore, action) {
  switch (action.type) {
    case AUTH_CHANGE_HANDLER:
      return {...store, controls: action.payload};
    case AUTH_REGISTER_ERROR:
      return {...store, controls: action.payload};
    case AUTH_LOGIN_SUCCESS:
      return {...store, token: action.payload};
    case LOGOUT:
      return initialStore;
    default:
      return store;
  }
}
