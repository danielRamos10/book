import { combineReducers } from "redux";
import bundleReducers from "./bundleReducers";
import cellsReducer from "./cellReducers";

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundleReducers,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
