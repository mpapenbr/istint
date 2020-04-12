import { raceReducer,raceInitialState } from "../reducer";
import { setDuration } from "../actions";

describe("race reducer", () => {
    it("should return initial state", () => {
          expect(
              raceReducer(raceInitialState, {type: "nix"})
          ).toEqual(raceInitialState)
    })
    it("should set the duration", () => {
        expect(
            raceReducer(raceInitialState, setDuration(42))            
        ).toEqual({
            ...raceInitialState,
            duration:42
        })
    })
}); 