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
  {
    ...defaultTrack,
    id: 3,
    name: "Spa",
    pitDelta: 23,
  },
  {
    ...defaultTrack,
    id: 4,
    name: "Imola",
    pitDelta: 33,
  },
  {
    ...defaultTrack,
    id: 5,
    name: "Monza",
    pitDelta: 26,
  },
  {
    ...defaultTrack,
    id: 6,
    name: "COTA",
    pitDelta: 21,
  },
  {
    ...defaultTrack,
    id: 7,
    name: "Sebring",
    pitDelta: 23,
  },
  {
    ...defaultTrack,
    id: 8,
    name: "Silverstone",
    pitDelta: 26,
  },
  {
    ...defaultTrack,
    id: 9,
    name: "Barcelona",
    pitDelta: 20,
  },
  {
    ...defaultTrack,
    id: 10,
    name: "Nürburgring 24h",
    pitDelta: 24,
  },
];
