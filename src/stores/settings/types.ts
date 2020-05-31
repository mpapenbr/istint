import { RaceStrategyMode } from "../stint/types";

export interface ISettings {
    autoRepair: boolean,
    strategy: RaceStrategyMode,
}

export const defaultSettings = {
    autoRepair: true,
    strategy: RaceStrategyMode.ALWAYS_NEW_TIRES,
}

export enum SettingsActionTypes {
    UPDATE_AUTO_REPAIR = '@@settings/UPDATE_AUTO_REPAIR',
    UPDATE_STRATEGY = '@@settings/UPDATE_STRATEGY',
}


export interface ISettingsState  {
    readonly data: ISettings;
}