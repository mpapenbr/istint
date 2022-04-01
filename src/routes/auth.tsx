import { ReactKeycloakProvider } from "@react-keycloak/web";
import React, { useState } from "react";
import keycloak from "../keycloak";
export interface IAuthContext {
  name?: string;
  preferred_username?: string;
  onLogin: () => void;
  onLogout: () => void;
}

export const AuthContext = React.createContext(null);
export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // const { keycloak } = useKeycloak();
  const [name, setName] = useState();

  const eventLogger = (event: unknown, error: unknown) => {
    if (event === "onAuthSuccess") {
      setName(keycloak.idTokenParsed.name);
    }
  };

  const tokenLogger = (tokens: unknown) => {
    console.log("onKeycloakTokens", tokens);
  };

  // const handleLogin = useCallback(() => {
  //   keycloak?.login();
  // }, [keycloak]);
  // const handleLogout = useCallback(() => keycloak?.logout(), [keycloak]);
  const handleLogin = () => {
    keycloak.login();
  };
  const handleLogout = () => keycloak.logout();
  const value = {
    onLogin: handleLogin,
    onLogout: handleLogout,
    name: name,
  };

  return (
    <ReactKeycloakProvider onEvent={eventLogger} onTokens={tokenLogger} authClient={keycloak}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </ReactKeycloakProvider>
  );
};
