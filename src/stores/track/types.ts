

export interface ITrack  {
    id: number,
    name: string,
    pitDelta: number,

}

export const defaultTrack : ITrack = {
    id: 0,
    name: "DefaultTrack",
    pitDelta: 25
}

export enum TrackActionTypes {
    UPDATE_DEFAULT_TRACK = '@@car/UPDATE_DEFAULT_TRACK', // just for testing, will be removed
    
    
}

export interface TrackState {
    readonly currentTrack: ITrack,
    readonly allTracks: ITrack[],
}

