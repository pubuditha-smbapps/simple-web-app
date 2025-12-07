import React from "react";
import { Menu, Layout } from "antd";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const { Header } = Layout;

const leftItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "profile", label: "Profile" },
  { key: "settings", label: "Settings" },
];
const rightItems = [{ key: "logout", label: "Logout" }];

const NavBar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Map pathname to menu key
  const pathToKey: Record<string, string> = {
    "/dashboard": "dashboard",
    "/profile": "profile",
    "/settings": "settings",
  };
  const selectedKey = pathToKey[location.pathname] || "dashboard";

  const handleMenuClick = (e: any) => {
    if (e.key === "logout") {
      logout();
      navigate("/login");
    } else if (e.key === "dashboard") {
      navigate("/dashboard");
    } else if (e.key === "profile") {
      navigate("/profile");
    } else if (e.key === "settings") {
      navigate("/settings");
    }
  };

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: 0,
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={leftItems}
        style={{ minWidth: 0, flex: "none" }}
        onClick={handleMenuClick}
      />
      <div className="demo-logo" style={{ flex: 1 }} />
      <Menu
        theme="dark"
        mode="horizontal"
        items={rightItems}
        style={{ minWidth: 0, borderLeft: "1px solid #222", flex: "none" }}
        onClick={handleMenuClick}
      />
    </Header>
  );
};

export default NavBar;
