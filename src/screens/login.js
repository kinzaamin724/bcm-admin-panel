import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import "antd/dist/reset.css"; 
import "../style/login/login.scss"; 

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        "https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/loginAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
  
      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok && data.token) {
      message.success("login successful")
        localStorage.setItem("token", data.token); 
        localStorage.setItem("_id", data?.user?._id); 
        console.log("Token:", data.token);
        window.location.href = "/home"; 
    
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="login-container">
      <h2 className="login">Login</h2>

     
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
