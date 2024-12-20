import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import "antd/dist/reset.css";
import "../style/login/login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import lock from "../assets/icons/lock.svg";
import mail from "../assets/icons/mail.svg";
import eyeSlash from "../assets/icons/eye-slash.svg";
import eye from "../assets/icons/eye.svg";
import { ReactSVG } from "react-svg";

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

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
      setUserId(userId);

      if (response.status === 200 && userId) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("_id", userId);
        message.success("Login successful");

        navigate("/home");
      } else {
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
    <div className="flex font-pop items-center justify-center min-h-[100dvh]">
      <Form
        name="loginForm"
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        className="login-container login-form flex flex-col gap-[50px] sm:scale-[0.4] md:scale-[0.75] 2xl:scale-[1] "
      >
        <h2 className="login font-pop font-[700] text-app-black">Welcome</h2>
        <div className="flex flex-col gap-[24px]">
          <Form.Item
            className="h-[120px] m-0 flex flex-col gap-[12px]"
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              type="email"
              prefix={<ReactSVG className="mr-1" src={mail} />}
              className="h-[80px] !m-0 px-[20px] py-[25px] rounded-[16px] font-pop text-[18px] border-app-highlight-color border "
              placeholder="Enter your email address"
            />
          </Form.Item>

          <Form.Item
            className="h-[120px] m-0 flex flex-col gap-[12px]"
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              suffix={
                <ReactSVG
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                  src={showPassword ? eye : eyeSlash}
                />
              }
              type={showPassword ? "text" : "password"}
              prefix={<ReactSVG className="mr-1" src={lock} />}
              className="h-[80px] !m-0 px-[20px] py-[25px] rounded-[16px] text-[18px] font-pop border-app-highlight-color border "
              placeholder="Enter your password"
            />
          </Form.Item>
        </div>

        <Button
          className="h-[80px] hover:!bg-app-red-500 !m-0 px-[20px] py-[25px] text-[24px] font-[600] rounded-[16px] border-app-highlight-color border bg-app-red-500 text-white "
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          block
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
