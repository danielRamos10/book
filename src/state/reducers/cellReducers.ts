import { Cell } from "./../cell";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface CellReducerState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}
const initialState: CellReducerState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};
const cellsReducer = (
  state: CellReducerState = initialState,
  action: Action
): CellReducerState => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      return state;
    case ActionType.DELETE_CELL:
      return state;
    case ActionType.MOVE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    default:
      return state;
  }
};
export default cellsReducer;
