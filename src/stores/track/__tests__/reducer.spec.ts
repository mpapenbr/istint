import { replaceTrackState } from "../actions";
import { trackInitialState, trackReducer } from "../reducer";
import { defaultTrack } from "../types";
// import * as sampleRace from "./__mockData__/sampleRace.json";

describe("track reducer", () => {
  it("should return initial state", () => {
    expect(trackReducer(trackInitialState, { type: "nix" })).toEqual(
      trackInitialState
    );
  });

  it("should replace the track state with new data", () => {
    const sampleState = {
      ...trackInitialState,
      currentTrack: { ...defaultTrack, name: "My test Track" },
    };

    expect(
      trackReducer(trackInitialState, replaceTrackState(sampleState))
    ).toMatchObject(sampleState);
  });
});
