// src/components/Header.js
import React, { useState } from 'react';
import { Layout, Button, Popconfirm, message } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import Profile from "../../assets/home/profile.png";
import "../../style/layout/layout.scss";
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const CustomHeader = ({ collapsed, toggle }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false); 
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const showPopconfirm = () => {
    setIsMenuVisible(true);
  };
  const handleConfirm = () => {
    message.success('Logged out successfully');
    setIsMenuVisible(false);
    navigate('/login');
  };
  const handleCancel = () => {
    setIsMenuVisible(false);
  };

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        borderBottom:"0.5px solid #f0f0f0"
      }}
    >
      <div className="profile" >
        <div className="profile-desc">
          <img src={Profile} alt="Profile" /> <p>Admin</p>
          <Popconfirm
            placement="bottomLeft"
            title="Confirm Logout?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
            visible={isMenuVisible}
          >
            <RiLogoutCircleRLine
              className="icon"
              onClick={showPopconfirm}
            />
          </Popconfirm>
        </div>
      </div>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggle}
        style={{
          fontSize: '16px',
          width: 50,
          height: 64,
        }}
      />
    </Header>
  );
};

export default CustomHeader;
