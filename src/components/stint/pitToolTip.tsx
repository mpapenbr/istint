import { Tooltip } from "antd";
import React from "react";
import { sprintf } from "sprintf-js";
import { IPitTime } from "../../stores/stint/types";
import { secAsString } from "../../utils/output";

const PitToolTip = (data: IPitTime) => {
  const DetailTable: React.FC<IPitTime> = (localProps: IPitTime) => (
    <>
      <span>Pit stop details</span>
      <table>
        <tbody>
          <tr>
            <td align="left">Pit delta</td>
            <td>{sprintf("%.1f", localProps.pitDelta)}</td>
          </tr>
          <tr>
            <td>Refill</td>
            <td>{sprintf("%.1f", localProps.refill)}</td>
          </tr>
          <tr>
            <td>Driver</td>
            <td>{sprintf("%.1f", localProps.driverChange)}</td>
          </tr>
          <tr>
            <td>Tires</td>
            <td>{sprintf("%.1f", localProps.changeTires)}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{sprintf("%.1f", localProps.total)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
  return (
    <Tooltip title={DetailTable(data)}>
      <span>{secAsString(data.total)}</span>
    </Tooltip>
  );
};
export default PitToolTip;
