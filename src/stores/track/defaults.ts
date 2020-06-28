import { defaultTrack, ITrack } from "./types";

export const defaults: ITrack[] = [
  {
    ...defaultTrack,
    id: 1,
    name: "Le Mans",
    pitDelta: 29,
  },
  {
    ...defaultTrack,
    id: 2,
    name: "Spa Endurance",
    pitDelta: 60,
  },
];
