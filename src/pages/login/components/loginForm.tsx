import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    const success = await login(values.username!, values.password!);
    setLoading(false);
    if (success) {
      message.success("Login successful!");
      navigate("/dashboard");
    } else {
      message.error("Invalid username or password");
    }
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType> name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ minWidth: 180, display: "block", margin: "0 auto" }}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
