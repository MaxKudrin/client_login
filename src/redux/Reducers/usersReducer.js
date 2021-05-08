import {GET_USERS, GET_USERS_ERROR, LOGOUT} from "../Actions/actionTypes";

const initialStore = {
  usersList: null,
  authorized: null,
};
export default function usersReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_USERS:
      return {...store, usersList: action.payload, authorized: null};
    case GET_USERS_ERROR:
      return {...store, usersList: null, authorized: action.payload};
    case LOGOUT:
      return initialStore;
    default:
      return store;
  }
}
