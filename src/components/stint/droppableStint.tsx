import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../commons";

interface IProps {
  no: number;
}
const DroppableStint: React.FC<IProps> = ({ no, children }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.DRIVER,
    drop: () => ({
      no: no,
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  return <div ref={drop}>{children}</div>;
};
export default DroppableStint;
