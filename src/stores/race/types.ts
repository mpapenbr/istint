export interface TimedRace extends Race {
    duration: number //unit?
}

export interface Race {
    name: string
}

export enum RaceActionTypes {
    SET_DURATION = '@@race/SET_DURATION',
    
}

export interface RaceState {
    readonly data : TimedRace
}