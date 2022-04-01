import * as React from "react";
import { Navigate } from "react-router";
import { useAuth } from "./auth";

export const PrivateRoute = ({ children }) => {
  const { name } = useAuth();

  if (!name) {
    return <Navigate to="/" replace />;
  }
  return children;
};
