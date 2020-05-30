import { ITrack, defaultTrack } from "./types";

export const defaults : ITrack[] = [
    {
        ...defaultTrack,
        id: 1,
        name: "Le Mans",
        pitDelta: 29,
    }
        
];
