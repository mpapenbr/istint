// TODO: Refactor with Typescript 4.9.x
export enum UiMainEnum {
  Drivers,
  Tracks,
  Cars,
  Settings,
  QuickProposal,
  Planing,
  Compact,
  Storage,
  OtherSettings,
  FuleInfos,
  Server,
}
export interface IUi {
  main: UiMainEnum;
}

export const defaultUi: IUi = {
  main: UiMainEnum.Settings,
};

export enum UiActionTypes {
  CHANGE_MAIN_LEVEL = "@@ui/CHANGE_MAIN_LEVEL",
}

export interface IUiState {
  readonly data: IUi;
}
