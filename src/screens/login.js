import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import "antd/dist/reset.css"; 
import "../style/login/login.scss"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
const [userId , setUserId] = useState("")


const onFinish = async (email, password) => {
  setIsSubmitting(true);
  setError(null);

  try {
    const response = await axios.post(
      "https://zeta-bonfire-426108-u1.uc.r.appspot.com/admin/user/loginAdmin",
      email,
       password,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setIsSubmitting(false);
    const data = response.data;
    const userId = data?.user?._id;
    setUserId(userId)

    if (response.status === 200 && userId) {
      localStorage.setItem("token", data.token);  
      localStorage.setItem("_id", userId); 
      message.success("Login successful");

 
      navigate("/home");
    }
    else {
      setError(data.message || "Login failed. Please try again.");
      navigate("/");
    }
  } catch (err) {
    setIsSubmitting(false);
    setError("An error occurred. Please try again later.");
    message.error("Login failed. Please check your credentials.");
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
