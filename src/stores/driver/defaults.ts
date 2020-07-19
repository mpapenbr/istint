import { defaultDriver, IDriver } from "./types";

export const sampleDrivers: IDriver[] = [
  {
    ...defaultDriver,
    id: 1,
    name: "A",
    backgroundColor: "#B0BC00",
  },
  {
    ...defaultDriver,
    id: 2,
    name: "B",
    backgroundColor: "#FB9E00",
  },
  {
    ...defaultDriver,
    id: 3,
    name: "C",
    backgroundColor: "#AEA1FF",
  },
  {
    ...defaultDriver,
    id: 4,
    name: "D",
    backgroundColor: "#73D8FF",
  },
];
