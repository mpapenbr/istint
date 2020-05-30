import { ICar, TireChangeMode, defaultCar } from "./types";

export const defaults : ICar[] = [
    {
        ...defaultCar,
        id: 1,
        name: "Audi R8",
        tank: 120,
        refillRate: 2.7,
        
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
        refillRate: 2.6,
        
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
        tireChangeMode: TireChangeMode.DURING_REFILL

        
    }
];
