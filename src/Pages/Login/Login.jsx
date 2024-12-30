import { Form, Input, Button, Spin } from "antd";
import "../../styles/Login/Login.scss";
// import { image } from "../../assets/image";
import { GrMail } from "react-icons/gr";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { GoLock } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { FiLock } from "react-icons/fi";
// import { useLogin } from "../../hooks/useHook";
// import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  return (
    <div className="login-container">
      <div className="login-top">
        <h4 className="heading-login">Welcome</h4>
      </div>

      <div className="form-items">
        <Form
          name="login"
          layout="vertical"
          className="input-item"
          // onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the correct email" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex for validating email
                message: "Please enter the correct email"
              }
            ]}
            // rules={[{ required: true, message: "Please input your Email!" }]}
            className="radial-gradient-input"
          >
            <Input
              className="ant-input-login"
              prefix={<HiOutlineMail className="prefix-icon" />}
              placeholder="Enter Your Email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              className="ant-input-login"
              prefix={<FiLock className="prefix-icon" />}
              placeholder="Enter Your Password"
              iconRender={(visible) =>
                visible ? (
                  <FaEye style={{ color: "#ED4B4B", fontSize: "20px" }} />
                ) : (
                  <FaEyeSlash
                    className="prefix-icon"
                    style={{ color: "#ED4B4B", fontSize: "20px" }}
                  />
                )
              }
            />
          </Form.Item>

          <Form.Item>
            <div className="login-button">
              <Button
                className="primary-btn"
                type="primary"
                htmlType="submit"
                block
                // loading={loading}
              >
                {/* {loading ? ( */}
                <div className="loader-container">
                  {/* <Spin size="small" /> */}
                </div>
                {/* ) : ( */} Login
                {/* )} */}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
