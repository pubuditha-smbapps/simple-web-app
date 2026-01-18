// Centralized frontend types

// Auth types
export type User = {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
};

export type AuthContextType = {
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

// Todo types
export type Todo = {
  id: string;
  title: string;
  description?: string;
  userId?: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// Form types
export type SignupFormFields = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type LoginFormFields = {
  username?: string;
  password?: string;
  remember?: boolean;
};
