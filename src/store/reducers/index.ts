import { combineReducers } from "redux";
import { applicationReducer } from "./app";
import { playlistReducer } from "./playlist";

// combineReducers 组合reducers
const rootReducer = combineReducers({
  playlist: playlistReducer,
  app:applicationReducer
});

export default rootReducer