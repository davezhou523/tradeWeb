import {
  DashboardOutlined,
  UserAddOutlined,
  TeamOutlined,
  MailOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import React from 'react';

export const menuItems = [
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

// 新增：获取所有菜单key的方法
export const getMenuKeys = () => menuItems.map(item => item.key);