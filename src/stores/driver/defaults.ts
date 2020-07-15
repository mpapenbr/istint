import { defaultDriver, IDriver } from "./types";

export const sampleDrivers: IDriver[] = [
  {
    ...defaultDriver,
    name: "A",
  },
  {
    ...defaultDriver,
    name: "B",
  },
  {
    ...defaultDriver,
    name: "C",
  },
  {
    ...defaultDriver,
    name: "D",
  },
];
