import { action } from "typesafe-actions";
import { replaceTrackState } from "../actions";
import { trackInitialState } from "../reducer";
import { defaultTrack, TrackActionTypes } from "../types";
// import * as sampleCarState from "./__mockData__/sampleCarState.json";

describe("track actions", () => {
  it("should replace the track state with new data", () => {
    const sampleTrackState = {
      ...trackInitialState,
      currentTrack: { ...defaultTrack, name: "My track" },
    };
    const expectedAction = action(TrackActionTypes.REPLACE, sampleTrackState);
    expect(replaceTrackState(sampleTrackState)).toEqual(expectedAction);
  });
});
