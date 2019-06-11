import { combineReducers } from "redux";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import tripReducer from "./tripReducer";

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  trips: tripReducer
});

export default rootReducer;
