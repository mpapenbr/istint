import { stintReducer,stintInitialState } from "../reducer";
import { compute } from "../actions";

describe("stint reducer", () => {
    it("should return initial state", () => {
          expect(
              stintReducer(stintInitialState, {type: "nix"})
          ).toEqual(stintInitialState)
    })
    
}); 