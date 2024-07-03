// src/components/CustomLayout.js
import React, { useState, useEffect } from 'react';
import { Layout, theme } from 'antd';
import Sidebar from './sidebar/Sidebar';
import CustomHeader from './header/CustomHeader';
import CustomFooter from './footer/CustomFooter';

const { Content } = Layout;

const CustomLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true); // Close sidebar on mobile devices
      } else {
        setCollapsed(false); // Open sidebar on other devices
      }
    };

    // Set initial state based on current width
    handleResize();

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} />
      <Layout className="site-layout">
        <CustomHeader collapsed={collapsed} toggle={toggle} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        {/* <CustomFooter /> */}
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
