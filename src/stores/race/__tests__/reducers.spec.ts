import { raceReducer,raceInitialState } from "../reducer";
import { setDuration, computeRaceProposalTry } from "../actions";

describe("race reducer", () => {
    it("should return initial state", () => {
          expect(
              raceReducer(raceInitialState, {type: "nix"})
          ).toEqual(raceInitialState)
    })

    

    it("should set the duration ", () => {
        expect(
            raceReducer(raceInitialState, setDuration(42))            
        ).toMatchObject({            
            data: {duration:42}
        })
    })

    
    it("should compute a proposal (1 stint)", () => {
        expect(
            raceReducer(raceInitialState, computeRaceProposalTry({racetime:100, avgLaptime:10, fuelConsumption:3, tank:40}))            
        ).toMatchObject({            
            data: {stints: [{duration: 100, fuel:30, numLaps:10}]}
        })
    })

    it("should compute a proposal (2 stints)", () => {
        expect(
            raceReducer(raceInitialState, computeRaceProposalTry({racetime:100, avgLaptime:10, fuelConsumption:5, tank:40}))            
        ).toMatchObject({            
            data: {
                stints: [
                    {duration: 80, fuel:40, numLaps:8},
                    {duration: 20, fuel:10, numLaps:2}
                ]
            }
        })
    })

    it("should compute a proposal (racetime 1sec over calc)", () => {
        expect(
            raceReducer(raceInitialState, computeRaceProposalTry({racetime:81, avgLaptime:10, fuelConsumption:5, tank:40}))            
        ).toMatchObject({            
            data: {
                stints: [
                    {duration: 80, fuel:40, numLaps:8},
                    {duration: 10, fuel:5, numLaps:1}                
                ]
            }
        })
    })
    
}); 