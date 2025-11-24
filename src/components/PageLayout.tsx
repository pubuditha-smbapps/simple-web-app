import React from "react";
import NavBar from "./NavBar";
import FooterBar from "./FooterBar";
import { Breadcrumb, Layout, theme } from "antd";

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumbItems?: { title: string }[];
  pageTitle?: string;
}
const { Content } = Layout;

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  breadcrumbItems,
  pageTitle,
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavBar />
      <Content style={{ padding: "32px 48px", flex: 1 }}>
        {breadcrumbItems && (
          <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />
        )}
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {pageTitle && (
            <h2 style={{ marginTop: 0, marginBottom: 24 }}>{pageTitle}</h2>
          )}
          {children}
        </div>
      </Content>
      <FooterBar />
    </Layout>
  );
};

export default PageLayout;
