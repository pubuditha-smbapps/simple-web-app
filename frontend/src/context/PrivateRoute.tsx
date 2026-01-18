import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Spin } from "antd";
import {
  validateTokenWithBackend,
  clearAuthState,
  getStoredUser,
} from "../services/authService";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, setUser } = useAuth();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const storedUser = getStoredUser();

      if (storedUser) {
        const isValid = await validateTokenWithBackend();

        if (isValid) {
          setUser(storedUser);
        } else {
          clearAuthState();
          setUser(null);
        }
      }
      setIsValidating(false);
    };

    validateToken();
  }, [setUser]);

  if (isValidating) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" tip="Validating session..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
