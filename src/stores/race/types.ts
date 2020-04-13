import {Stint} from '../stint/types'

export interface TimedRace extends Race {
    duration: number //unit: minutes
    stints: Stint[]
}

export interface Race {
    name: string
}

export enum RaceActionTypes {
    SET_DURATION = '@@race/SET_DURATION',
    COMPUTE_PROPOSAL = '@@race/COMPUTE_PROPOSAL',
    SET_STINTS = '@@race/SET_STINTS',
    
}

export interface RaceState {
    readonly data : TimedRace
}