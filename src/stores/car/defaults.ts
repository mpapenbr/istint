import { defaultCar, ICar, TireChangeMode } from "./types";

export const defaults: ICar[] = [
  {
    ...defaultCar,
    id: 1,
    name: "Audi R8",
    tank: 120,
    refillRate: 80 / 27.83, // ~2.87,
  },
  {
    ...defaultCar,
    id: 2,
    name: "Ferrari GTE",
    tank: 90,
    refillRate: 2.7,
  },
  {
    ...defaultCar,
    id: 3,
    name: "Ferrari GT3",
    tank: 110,
    refillRate: 80 / 30.23, // ~ 2.64
  },
  {
    ...defaultCar,
    id: 4,
    name: "Porsche RSR",
    tank: 99,
    refillRate: 2.9,
  },
  {
    ...defaultCar,
    id: 5,
    name: "Corvette DP7",
    tank: 76,
    refillRate: 3.1,
    tireChangeTime: 16,
    tireChangeMode: TireChangeMode.DURING_REFILL,
  },
  {
    ...defaultCar,
    id: 6,
    name: "BMW Z4",
    tank: 115,
    refillRate: 80 / 29.07, // ~ 2.75
  },
  {
    ...defaultCar,
    id: 7,
    name: "McL MP4-12C",
    tank: 130,
    refillRate: 80 / 25.8, // ~ 3.10
  },
  {
    ...defaultCar,
    id: 8,
    name: "BMW M8 GTE",
    tank: 92,
    refillRate: 80 / 29.47, // ~ 2.71
  },
  {
    ...defaultCar,
    id: 9,
    name: "Corvette C8.R GTE",
    tank: 97,
    refillRate: 80 / 28, // ~ 2.86
  },
  {
    ...defaultCar,
    id: 10,
    name: "P217 LMP2",
    tank: 75,
    tireChangeTime: 22, // strange, would have thought of 27s
    refillRate: 60 / 24.4, // ~ 2.45 (big variance detected 23.1-25.6s)
  },

  {
    ...defaultCar,
    id: 11,
    name: "Lamborghini GT3",
    tank: 120,
    tireChangeTime: 27,
    refillRate: 80 / 27.83, // ~2.87,
  },
];
