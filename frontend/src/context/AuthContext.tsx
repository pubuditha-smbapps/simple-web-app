import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import "../utils/axiosConfig";
import {
  clearAuthState,
  getStoredUser,
  setAuthData,
} from "../services/authService";

type AuthContextType = {
  user: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  setUser: (user: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(() => {
    return getStoredUser();
  });

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
      });
      const token = res.data?.token;
      if (!token) return false;
      setAuthData(token, username);
      setUser(username);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      await axios.post("/auth/signup", {
        username,
        email,
        password,
      });
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    clearAuthState();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
