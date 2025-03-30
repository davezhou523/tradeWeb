import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { useAuth } from './contexts/AuthContext';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  UserAddOutlined,
  TeamOutlined,
  MailOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';

const { Header, Sider, Content } = Layout;

const Logo = styled.div`
  height: 64px;
  padding: 16px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  background: #002140;
`;

const StyledLayout = styled(Layout)`
  .ant-layout-sider {
    background: #001529;
  }
  .ant-menu {
    background: transparent;
    color: rgba(255, 255, 255, 0.65);
  }
  .ant-menu-item-selected {
    background-color: #1890ff !important;
    color: white;
  }
`;

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  React.useEffect(() => {
    if (location.pathname === '/' && isAuthenticated) {
      navigate('/dashboard');
    } else if (location.pathname === '/' && !isAuthenticated) {
      navigate('/login');
    }
  }, [location.pathname, navigate, isAuthenticated]);

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: '/customer-acquisition',
      icon: <UserAddOutlined />,
      label: '客户获取',
    },
    {
      key: '/customer-management',
      icon: <TeamOutlined />,
      label: '客户管理',
    },
    {
      key: '/email-marketing',
      icon: <MailOutlined />,
      label: '邮件营销',
    },
    {
      key: '/email-templates',
      icon: <FileTextOutlined />,
      label: '邮件模板',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  if (location.pathname === '/login') {
    if (isAuthenticated) {
      navigate('/dashboard');
      return null;
    }
    return <Outlet />;
  }

  return (
    <StyledLayout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark">
        <Logo>外贸SaaS系统</Logo>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ height: '100%', borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header className="ant-layout-header" style={{ background: '#fff', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0 24px' }}>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>欢迎，{user.name}</span>
              <Button onClick={logout} type="link">退出</Button>
            </div>
          )}
        </Header>
        <Content style={{ margin: '24px', padding: 24, background: '#fff', minHeight: 280, borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
          <Outlet />
        </Content>
      </Layout>
    </StyledLayout>
  );
};

export default App;
