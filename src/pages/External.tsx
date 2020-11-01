import React from "react";
import { useLocation } from "react-router-dom";
import { EXT_LOAD_ID } from "../constants";

interface IStateProps {}
interface IDispatchProps {}

type MyProps = IStateProps & IDispatchProps;

interface LocationState {
  from: {
    pathname: string;
  };
}

const External: React.FC<MyProps> = (props: MyProps) => {
  const location = useLocation<LocationState>();
  console.log(location);
  const currentLocationState: LocationState = location.state || {
    from: { pathname: "/homex" },
  };
  console.log(currentLocationState);

  const getUrlParameter = (name: any) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    const results = regex.exec(location ? location.search : "");
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };
  const id = getUrlParameter("id");
  if (id.length > 0) {
    console.log("issue load request for " + id);
    window.sessionStorage.setItem(EXT_LOAD_ID, id);
  }
  return (
    <div>
      <p>Irgendwas</p>
      {/* <p>{currentLocationState}</p> */}
    </div>
  );
};
export default External;
