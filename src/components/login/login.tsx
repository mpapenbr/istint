// type MyProps = IStateProps & IDispatchProps;
import Keycloak from "keycloak-js";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../stores";
import { userAuthData } from "../../stores/user/action";

const Login: React.FC<{}> = () => {
  const userData = useSelector(({ user }: ApplicationState) => ({
    ...user.data,
  }));
  const dispatch = useDispatch();
  const updateAuthData = useCallback((param: any) => dispatch(userAuthData(param)), [dispatch]);
  useEffect(() => {
    const keycloak = Keycloak({
      realm: "iracing-tools",
      url: "http://localhost:8180/auth",
      clientId: "login-web",
    });
    if (userData.id.length === 0) {
      keycloak
        .init({
          onLoad: "login-required",
        })
        .then((authenticated) => {
          console.log("hallo " + authenticated);
          console.log({ keycloak });
          updateAuthData(keycloak);
          // this.setState({ keycloak: keycloak, authenticated: authenticated })
        });
    }
  });
  console.log("done");
  return <div />;
};

export default Login;
