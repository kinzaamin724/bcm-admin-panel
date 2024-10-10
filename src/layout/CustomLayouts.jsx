// src/components/CustomLayout.js
import React, { useState, useEffect } from 'react';
import { Layout, theme } from 'antd';
import Sidebar from './sidebar/Sidebar';
import CustomHeader from './header/CustomHeader';
// import CustomFooter from './footer/CustomFooter';

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
        setCollapsed(true); 
      } else {
        setCollapsed(false); 
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar className="h-[100vh] fixed" collapsed={collapsed} />
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
        </Layout>
    </Layout>
  );
};

export default CustomLayout;
