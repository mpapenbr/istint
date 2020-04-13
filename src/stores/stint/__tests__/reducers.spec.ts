import { stintReducer,stintInitialState } from "../reducer";
import { compute } from "../actions";

describe("stint reducer", () => {
    it("should return initial state", () => {
          expect(
              stintReducer(stintInitialState, {type: "nix"})
          ).toEqual(stintInitialState)
    })
    it("should detect upper tank limit", () => {
        expect(
            stintReducer(stintInitialState, compute({racetime: 100, avgLaptime:10, fuelConsumption:3, tank:50}))            
        ).toEqual({
             ...stintInitialState,
            numLaps:10,
            duration: 100,
            fuel: 30

        })
    })
    it("should do something with toHaveProperty", () => {
        expect(
            stintReducer(stintInitialState, compute({racetime: 100, avgLaptime:10, fuelConsumption:3, tank:50}))            
        ).toHaveProperty("numLaps", 10)
    })
    it("should detect tank limit", () => {
        expect(
            stintReducer(stintInitialState, compute({racetime: 100, avgLaptime:10, fuelConsumption:3, tank:20}))            
        ).toEqual({
            ...stintInitialState,
            numLaps:6,
            duration: 60,
            fuel: 18
        })
    })
}); 