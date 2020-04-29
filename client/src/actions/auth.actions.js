import axios from "axios";
import { returnErrors } from "./error.actions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// check token and load user
export const loadUser = () => async (dispatch, getState) => {
  // user loading
  dispatch(setUserLoading());

  try {
    const response = await axios.get(
      "/api/v1/auth/user",
      tokenConfig(getState)
    );
    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};
