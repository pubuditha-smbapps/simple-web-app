import React from "react";
import { Card, Row, Col, Statistic, Avatar, Typography } from "antd";
import { UserOutlined, TrophyOutlined } from "@ant-design/icons";
import PageLayout from "../../components/PageLayout";

const { Title, Text } = Typography;

const Dashboard: React.FC = () => (
  <PageLayout
    breadcrumbItems={[{ title: "Home" }, { title: "Dashboard" }]}
    pageTitle="Dashboard"
  >
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} md={8}>
        <Card style={{ textAlign: "center" }}>
          <Avatar
            size={80}
            icon={<UserOutlined />}
            style={{ marginBottom: 16 }}
          />
          <Title level={3} style={{ marginBottom: 0 }}>
            Welcome, Pubuditha!
          </Title>
          {/* <Text type="secondary">pubuditha@gmail.com</Text> */}
        </Card>
      </Col>
      <Col xs={24} md={16}>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Points"
                value={1280}
                prefix={<TrophyOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic title="Tasks Completed" value={42} />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic title="Credits Remaining" value={"100"} />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  </PageLayout>
);

export default Dashboard;
