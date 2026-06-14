import { createContext, useContext, useMemo, useState } from "react";
import api from "../services/api";
import { roles } from "../utils/constants";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("careernest_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async ({ email, password, role = roles.candidate } = {}) => {
    let nextUser;
    let token;

    if (email && password) {
      const response = await api.post("/auth/login", { email, password });
      nextUser = response.data.data.user;
      token = response.data.data.token;
    } else {
      nextUser = { name: "Alex Rivera", email: "alex@careernest.com", role };
      token = "demo-token";
    }

    localStorage.setItem("careernest_user", JSON.stringify(nextUser));
    localStorage.setItem("careernest_token", token);
    setUser(nextUser);
    return nextUser;
  };

  const setSession = ({ user: nextUser, token }) => {
    localStorage.setItem("careernest_user", JSON.stringify(nextUser));
    localStorage.setItem("careernest_token", token);
    setUser(nextUser);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Local logout should still proceed if the API is unavailable.
    }
    localStorage.removeItem("careernest_user");
    localStorage.removeItem("careernest_token");
    setUser(null);
  };

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), login, logout, setSession }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
