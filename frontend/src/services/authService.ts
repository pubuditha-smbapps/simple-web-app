import axios from "axios";

export async function validateTokenWithBackend(): Promise<boolean> {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    await axios.get("/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error) {
    return false;
  }
}

export function clearAuthState(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function isTokenStored(): boolean {
  return !!localStorage.getItem("token");
}

export function getStoredUser(): string | null {
  return localStorage.getItem("user");
}

export function setAuthData(token: string, username: string): void {
  localStorage.setItem("token", token);
  localStorage.setItem("user", username);
}
