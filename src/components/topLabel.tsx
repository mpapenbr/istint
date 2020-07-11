import React from "react";

interface IProps {
  label: string;
  content: React.ReactNode;
}
const TopLabel: React.FC<IProps> = (props: IProps) => {
  return (
    <div style={{ float: "left" }}>
      <span style={{ display: "block" }}>{props.label}</span>
      <div style={{ display: "block" }}>{props.content}</div>
    </div>
  );
};

export default TopLabel;
