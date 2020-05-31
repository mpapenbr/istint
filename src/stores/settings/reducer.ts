import { Reducer } from 'redux'
import { ISettingsState, SettingsActionTypes, defaultSettings } from './types'

const initialState: ISettingsState = {
    data: defaultSettings
}

const reducer: Reducer<ISettingsState> = (state = initialState, action) => {
    switch(action.type) {
        
        case SettingsActionTypes.UPDATE_AUTO_REPAIR:
            console.log("setting autorepair to ", action.payload)
            return  {...state, data: {...state.data, autoRepair: action.payload}}                        
            
        case SettingsActionTypes.UPDATE_STRATEGY:
            return {...state, data: {...state.data, strategy: action.payload}}            
        default:
            return state;
    }
}

export {reducer as settingsReducer, initialState as settingsInitialState}