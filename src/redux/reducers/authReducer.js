import * as types from "../actionsTypes/authActionsTypes";

const initialState = {
  loader: false,
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case types.SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    case types.SET_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
