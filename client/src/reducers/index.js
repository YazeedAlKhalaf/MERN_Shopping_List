import { combineReducers } from "redux";
import itemReducer from "./item.reducer";
import authReducer from "./auth.reducer";
import errorReducer from "./error.reducer";

export default combineReducers({
  item: itemReducer,
  auth: authReducer,
  error: errorReducer,
});
