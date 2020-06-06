import { ITimedRace } from "./types";
import { Stint, IPitTime, defaultPitTime } from "../stint/types";
import { TireChangeMode } from "../car/types";
import { defaultSettings } from "../settings/types";
import { sprintf } from "sprintf-js";

function pitWorkTime(race: ITimedRace, currentStint:Stint, nextStint:Stint|undefined) : IPitTime  {
    
    if (nextStint === undefined) {
        console.log("returing ", {defaultPitTime})
        return {...defaultPitTime};
    }
    const work = {...defaultPitTime};
    work.pitDelta =  race.track.pitDelta;
    work.changeTires= currentStint.wantNewTires ? race.car.tireChangeTime : 0;
    work.refill = (( nextStint.numLaps * currentStint.driver.fuelPerLap) / race.car.refillRate );
    work.driverChange= (nextStint.driver.name === currentStint.driver.name ? 0 : 30);
    
    switch(race.car.tireChangeMode) {
        case TireChangeMode.DURING_REFILL:
            work.total =  work.pitDelta + Math.max(work.driverChange, Math.min(work.changeTires, work.refill));
            break;
        case TireChangeMode.AFTER_REFILL:
            work.total = work.pitDelta + Math.max(work.driverChange, work.changeTires + work.refill);
            break;
    }
    return work;
}

/**
 * when to call? if the user-input data is already present.
 * This method will take the parameter
 * - numLaps
 * - driver.baseLaptime
 * - driver.fuelPerLap
 * - wantNewTires
 * 
 * as given and will compute the resulting data 
 * 
 * @param race 
 */
export function recomputeRaceStints(race : ITimedRace) : Stint[] {
    const {stints} = race;
    console.log("recomputeRaceStints", {race}, "stints:", {stints})
    const newStints = Array.from(stints);
    newStints.forEach((s,i) => {
        s.duration = s.numLaps * s.driver.baseLaptime;
        s.fuel = s.numLaps * s.driver.fuelPerLap;
        s.problems = []
        if (s.fuel > race.car.tank) {            
            s.problems = Object.assign(s.problems, [{type: "error", msg: sprintf("Required fuel %.2f exceeds tank volume of %.2f", s.fuel, race.car.tank)}]);
            // console.log(s.problems)
        }
        const startTime = i === 0 ? new Date("2015-03-25T12:00:00Z") : new Date(newStints[i-1].simTime.end.getTime() + (newStints[i-1].pitTime.total*1000));
        
        const tmp = pitWorkTime(race,s, (i < (newStints.length-1)) ? newStints[i+1] : undefined);
        // console.log(tmp)
        s.pitTime = tmp;
        
        s.simTime = {
            start: startTime,
            end: new Date(startTime.getTime() + (s.duration * 1000))
        }
        // console.log(s)
    })
    return newStints;
}