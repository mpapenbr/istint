import { defaultCar, ICar, TireChangeMode } from "./types";

export const defaults: ICar[] = [
  {
    ...defaultCar,
    id: 1,
    name: "Audi R8",
    tank: 104,
    refillRate: 80 / 31.97, // ~2.5,
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
    tank: 101,
    refillRate: 80 / 33.17, // ~ 2.41
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
    tank: 101,
    refillRate: 80 / 33.17, // ~ 2.41
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
    refillRate: 60 / 26.5, // ~ 2.26
  },

  {
    ...defaultCar,
    id: 11,
    name: "Lamborghini GT3",
    tank: 104,
    tireChangeTime: 27,
    refillRate: 80 / 31.97, // ~2.5,
  },

  {
    ...defaultCar,
    id: 12,
    name: "BMW M4 GT3",
    tank: 103,
    tireChangeTime: 27,
    refillRate: 80 / 32.33, // ~2.47,
  },
  {
    ...defaultCar,
    id: 13,
    name: "Mercedes AMG",
    tank: 106,
    tireChangeTime: 27,
    refillRate: 80 / 31.53, // ~2.53,
  },

  {
    ...defaultCar,
    id: 14,
    name: "Porsche 911 GT3R",
    tank: 98,
    tireChangeTime: 27,
    refillRate: 80 / 33.9, // ~2.36,
  },

  {
    ...defaultCar,
    id: 15,
    name: "Porsche 718 GT4 MR",
    tank: 87,
    tireChangeTime: 35,
    tireChangeMode: TireChangeMode.DURING_REFILL,
    refillRate: 80 / 53.2, // ~1.5,
  },
  {
    ...defaultCar,
    id: 16,
    name: "Aston Martin Vantage GT4",
    tank: 105,
    tireChangeTime: 35,
    tireChangeMode: TireChangeMode.DURING_REFILL,
    refillRate: 80 / 44.43, // ~1.8,
  },
  {
    ...defaultCar,
    id: 17,
    name: "BMW M4 GT4",
    tank: 104,
    tireChangeTime: 35,
    tireChangeMode: TireChangeMode.DURING_REFILL,
    refillRate: 80 / 44.8, // ~1.78,
  },
  {
    ...defaultCar,
    id: 18,
    name: "McLaren 570S GT4",
    tank: 110,
    tireChangeTime: 35,
    tireChangeMode: TireChangeMode.DURING_REFILL,
    refillRate: 80 / 42.4, // ~1.88,
  },
];
