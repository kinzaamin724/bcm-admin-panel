import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import "antd/dist/reset.css"; // Ensure Ant Design styles are reset
import "../style/login/login.scss"; // Optional, for custom styles
import Title from "antd/es/skeleton/Title";

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = (values) => {
    setIsSubmitting(true);
    setError(null);

    // Simulate login request
    setTimeout(() => {
      setIsSubmitting(false);
      if (values.email === "admin@example.com" && values.password === "password123") {
        alert("Login successful!");
      } else {
        setError("Invalid email or password");
      }
    }, 1000);
  };

  return (
    <div className="login-container">
        
      <h2 className="login">Login</h2>
 
      {error && <Alert message={error} type="error" showIcon closable />}
      <Form
        name="loginForm"
        layout="vertical"
        onFinish={onFinish}
        className="login-form"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button
          className="login-button"
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            block
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
