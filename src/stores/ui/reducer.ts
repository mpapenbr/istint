import { Reducer } from "redux";
import { defaultUi, IUiState, UiActionTypes } from "./types";

const initialState: IUiState = {
  data: defaultUi,
};

const reducer: Reducer<IUiState> = (state = initialState, action) => {
  switch (action.type) {
    case UiActionTypes.CHANGE_MAIN_LEVEL:
      const ret = { ...state, data: { ...state.data, main: action.payload } };
      //console.log({...ret})
      return ret;

    default:
      return state;
  }
};

export { reducer as uiReducer, initialState as uiInitialState };
