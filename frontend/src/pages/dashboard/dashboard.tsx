import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Avatar,
  Typography,
  Tabs,
  FloatButton,
  message,
} from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import PageLayout from "../../components/Common/PageLayout";
import TodoSection from "./TodoSection";
import TodoAddModal from "../../components/Todo/TodoAddModal";
import useTodos from "../../hooks/useTodos";
import { useAuth } from "../../context/AuthContext";

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { todos, loading, addTodo, updateTodo, deleteTodo } = useTodos();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;

  const handleAddTodo = async (values: {
    title: string;
    description?: string;
  }) => {
    try {
      await addTodo(values);
      message.success("Todo added successfully");
      setIsAddModalVisible(false);
    } catch (err) {
      console.error(err);
      message.error("Failed to add todo");
    }
  };

  return (
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
              Welcome,{" "}
              {user ? user.charAt(0).toUpperCase() + user.slice(1) : "User"}!
            </Title>
            <Text type="secondary">
              Stay updated with your tasks and manage your to-dos efficiently.
            </Text>
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic title="Todos" value={pending} />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic title="Tasks Completed" value={completed} />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic title="Total Tasks" value={total} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Tabs
        defaultActiveKey="todo"
        centered
        items={[
          {
            key: "todo",
            label: "Todo",
            children: (
              <TodoSection
                filter="pending"
                todos={todos}
                loading={loading}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            ),
          },
          {
            key: "completed",
            label: "Completed",
            children: (
              <TodoSection
                filter="completed"
                todos={todos}
                loading={loading}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            ),
          },
          {
            key: "all",
            label: "All Tasks",
            children: (
              <TodoSection
                filter="all"
                todos={todos}
                loading={loading}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            ),
          },
        ]}
      />
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{ right: 24, bottom: 24 }}
        onClick={() => setIsAddModalVisible(true)}
        tooltip="Add New Todo"
      />
      <TodoAddModal
        open={isAddModalVisible}
        onSave={handleAddTodo}
        onCancel={() => setIsAddModalVisible(false)}
      />
    </PageLayout>
  );
};

export default Dashboard;
