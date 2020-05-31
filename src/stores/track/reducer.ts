import { Reducer } from 'redux'
import { TrackState, TrackActionTypes, defaultTrack } from './types'
import { defaults as sampleTracks } from './defaults'

const initialState: TrackState = {
    currentTrack: defaultTrack,
    allTracks: sampleTracks
}

const reducer: Reducer<TrackState> = (state = initialState, action) => {
    switch(action.type) {
        // als Idee: hier könnte ein Saga zum Einsatz kommen: Parameter von Driver ändern sich und dann muss das Race neu berechnet werden.
        case TrackActionTypes.UPDATE_DEFAULT_TRACK:
            const ret =  {...state, data: action.payload}
            //console.log({...ret})
            return ret
        default:
            return state;
    }
}

export {reducer as trackReducer, initialState as carInitialState}