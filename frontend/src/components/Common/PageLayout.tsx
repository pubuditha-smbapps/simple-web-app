import React from "react";
import NavBar from "./NavBar";
import FooterBar from "./FooterBar";
import { Breadcrumb, Layout, theme, Grid } from "antd";

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
  const screens = Grid.useBreakpoint();
  const contentPadding = screens.xs ? "16px" : "32px 48px";
  const innerPadding = screens.xs ? 12 : 24;
  const titleStyle = screens.xs
    ? { marginTop: 0, marginBottom: 16, fontSize: 18 }
    : { marginTop: 0, marginBottom: 24 };
  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavBar />
      <Content style={{ padding: contentPadding, flex: 1 }}>
        {breadcrumbItems && (
          <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />
        )}
        <div
          style={{
            padding: innerPadding,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {pageTitle && <h2 style={titleStyle}>{pageTitle}</h2>}
          {children}
        </div>
      </Content>
      <FooterBar />
    </Layout>
  );
};

export default PageLayout;
