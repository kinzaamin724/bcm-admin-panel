import React from "react";

import { Layout, Menu } from "antd";
import Logo from "../../assets/home/splashlogo.png";

import { UserOutlined,VideoCameraOutlined,UploadOutlined} from "@ant-design/icons";


const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="demo-logo-vertical" />
      <div
      className={"flex , justify-center items-center  text-white mt-6 mb-5"}
       
      >
        <img
          src={Logo}
          alt=""
          className="w-[50px] h-[80px]"
         
        />
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "User Management",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "Pricing Management ",
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label:  "Subscription management",
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
