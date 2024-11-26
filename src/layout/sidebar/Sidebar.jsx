import React from "react";
import { Layout, Menu } from "antd";
import Logo from "../../assets/home/splashlogo.png";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { BiWorld } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={240}>
      <div className="demo-logo-vertical" />
      <div
        className={"flex, justify-center items-center  text-white mt-6 mb-5"}
      >
        <img src={Logo} alt="" className="w-[50px] h-[80px]" />
      </div> 
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="/"
          > 
            User Management
          </NavLink> 
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="/pricing"
          >
            Pricing Management
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined/>}>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="/subscription"
          >
            Subscription Management 
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<BiWorld />}>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="/countries"
          >
            Countries Management
          </NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
