import React from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { ItemTypes } from "../../commons";
import { IChangeStintDriver } from "../../stores/race/types";

interface IStateProps {
  name: string;
}

interface IDispatchProps {
  setDriver: (param: IChangeStintDriver) => void;
}

type MyProps = IStateProps & IDispatchProps;
const AssignableDriver: React.FC<MyProps> = ({ name, setDriver }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: ItemTypes.DRIVER },
    end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        setDriver({ no: dropResult.no, name: name });
        // alert(`You dropped ${item.name} into ${dropResult.no}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ opacity }}>
      {name}
    </div>
  );
};
export default AssignableDriver;
