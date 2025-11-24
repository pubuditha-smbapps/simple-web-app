import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterBar: React.FC = () => (
  <Footer style={{ textAlign: "center" }}>
    Ant Design ©{new Date().getFullYear()} Created by Ant UED
  </Footer>
);

export default FooterBar;
