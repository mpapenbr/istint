import { action } from "typesafe-actions";
import { IBaseAction } from "../../commons";
import { ITrack, TrackActionTypes, TrackState } from "./types";

export const updateDefaultTrack = (data: ITrack): IBaseAction =>
  action(TrackActionTypes.UPDATE_DEFAULT_TRACK, data);
export const replaceTrackState = (data: TrackState): IBaseAction =>
  action(TrackActionTypes.REPLACE, data);
