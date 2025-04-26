import React from 'react';
import { Layout, Menu, Button, Select } from 'antd';
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
import { useTranslation } from 'react-i18next';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

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
  const { i18n, t } = useTranslation();

  React.useEffect(() => {
    if (location.pathname === '/' && isAuthenticated) {
      navigate('/dashboard');
    } else if (location.pathname === '/' && !isAuthenticated) {
      navigate('/login');
    }
  }, [location.pathname, navigate, isAuthenticated]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: t('dashboard') || '仪表盘',
    },
    {
      key: '/customer-acquisition',
      icon: <UserAddOutlined />,
      label: t('customer_acquisition') || '客户获取',
    },
    {
      key: '/customer-management',
      icon: <TeamOutlined />,
      label: t('customer_management') || '客户管理',
    },
    {
      key: '/email-marketing',
      icon: <MailOutlined />,
      label: t('email_marketing') || '邮件营销',
    },
    {
      key: '/email-templates',
      icon: <FileTextOutlined />,
      label: t('email_templates') || '邮件模板',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: t('system_settings') || '系统设置',
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
    <ConfigProvider locale={i18n.language === 'zh' ? zhCN : enUS}>
      <StyledLayout style={{ minHeight: '100vh' }}>
        <Sider width={200} theme="dark">
          <Logo>{t('app_name') || '外贸SaaS系统'}</Logo>
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
            <Select defaultValue={i18n.language} style={{ width: 100, marginRight: 16 }} onChange={changeLanguage}>
              <Select.Option value="zh">中文</Select.Option>
              <Select.Option value="en">English</Select.Option>
            </Select>
            {user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{t('welcome') || '欢迎'}，{user.name}</span>
                <Button onClick={logout} type="link">{t('logout') || '退出'}</Button>
              </div>
            )}
          </Header>
          <Content style={{ margin: '24px', padding: 24, background: '#fff', minHeight: 280, borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
            <Outlet />
          </Content>
        </Layout>
      </StyledLayout>
    </ConfigProvider>
  );
};

export default App;
