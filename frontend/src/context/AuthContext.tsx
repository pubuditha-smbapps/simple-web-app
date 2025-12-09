import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  user: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("user") || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (username: string, password: string) => {
    if (username === "pubuditha" && password === "password") {
      setUser(username);
      return true;
    }
    return false;
  };

  const signup = async (username: string, email: string, password: string) => {
    // Store user data in localStorage (in real app, this would be an API call)
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if username already exists
    if (users.find((u: any) => u.username === username)) {
      return false;
    }

    // Add new user
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
