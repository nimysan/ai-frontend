import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  authenticationPath: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
  authenticationPath,
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={authenticationPath} state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
