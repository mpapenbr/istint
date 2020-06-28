import { Reducer } from "redux";
import { defaultDriver } from "../driver/types";
import { defaultRollingData, Stint, StintState } from "./types";

const defaultDate = new Date("2020-05-12");

const defaultStint: Stint = {
  no: 0,
  numLaps: 0,
  duration: 0,
  fuel: 0,
  driver: defaultDriver,
  wantNewTires: false,
  realTime: { start: defaultDate, end: defaultDate },
  simTime: { start: defaultDate, end: defaultDate },
  pitTime: {
    pitDelta: 0,
    refill: 0,
    driverChange: 0,
    changeTires: 0,
    total: 0,
  },
  rollingData: defaultRollingData,

  problems: [],
};

const initialState: StintState = {
  stint: defaultStint,
};

const reducer: Reducer<StintState> = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export { reducer as stintReducer, initialState as stintInitialState, defaultStint };
