import { Card } from "antd";
import React from "react";
import { CarState, ICar } from "../../stores/car/types";
import { ITimedRace } from "../../stores/race/types";
import CarDetails from "./carDetails";
import CarSelect from "./carSelect";

interface IStateProps {
  cars: CarState;
  raceData: ITimedRace;
}
interface IDispatchProps {
  setCar: (id: number) => void;
  updateCar: (data: ICar) => void;
}

type MyProps = IStateProps & IDispatchProps;

const CarEditCard: React.FC<MyProps> = (props: MyProps) => {
  const carSelected = (id: number) => {
    // console.log("Car " + id + " selected");
    props.setCar(id);
  };
  const data = { cars: props.cars.allCars, current: props.raceData.car };
  const carData = { data: props.raceData.car, updateCarData: props.updateCar };
  return (
    <>
      <Card title="Car details" size="small" extra={<CarSelect {...data} selectCar={carSelected} />}>
        <CarDetails {...carData} />
      </Card>
    </>
  );
};

export default CarEditCard;
