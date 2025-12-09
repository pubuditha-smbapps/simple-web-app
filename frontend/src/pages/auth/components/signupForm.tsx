import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const SignupForm: React.FC = () => {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    const success = await signup(
      values.username!,
      values.email!,
      values.password!
    );
    setLoading(false);

    if (success) {
      message.success("Signup successful! Please login.");
      navigate("/login");
    } else {
      message.error("Username already exists");
    }
  };

  return (
    <Form
      name="signup"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[
          { required: true, message: "Please input your username!" },
          { min: 3, message: "Username must be at least 3 characters!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be at least 6 characters!" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="Confirm Password"
        name="confirmPassword"
        rules={[{ required: true, message: "Please confirm your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ minWidth: 180, display: "block", margin: "0 auto" }}
        >
          Sign Up
        </Button>
      </Form.Item>

      <div style={{ textAlign: "center", marginTop: "16px" }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "#1890ff" }}>
          Login here
        </a>
      </div>
    </Form>
  );
};

export default SignupForm;
