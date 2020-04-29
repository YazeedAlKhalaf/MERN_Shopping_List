import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios.get("/api/v1/items").then((result) => {
    return dispatch({
      type: GET_ITEMS,
      payload: result.data,
    });
  });
};

export const deleteItem = (_id) => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .delete(`api/v1/items/${_id}`)
    .then((result) => {
      if (result.data["success"] === true) {
        return dispatch({
          type: DELETE_ITEM,
          payload: _id,
        });
      }
    })
    .catch((error) => {
      console.log("ERROR: ", error);
    });
};

export const addItem = (item) => (dispatch) => {
  dispatch(setItemsLoading());
  axios.post("api/v1/items", item).then((result) => {
    return dispatch({
      type: ADD_ITEM,
      payload: result.data,
    });
  });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
