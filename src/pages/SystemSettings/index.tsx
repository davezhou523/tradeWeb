import React, { useState } from 'react';
import { Card, Tabs, Form, Input, Button, Upload, Table, Switch, Space, Select } from 'antd';
import { UploadOutlined, UserOutlined, TeamOutlined, MailOutlined, DatabaseOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  padding: 24px;
`;

const SystemSettings = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const items = [
    {
      key: 'account',
      label: '账户设置',
      icon: <UserOutlined />,
      children: (
        <Form form={form} layout="vertical" style={{ maxWidth: 600 }}>
          <Form.Item name="name" label={t('name')} rules={[{ required: true }]}>
            <Input placeholder={t('please_input_name')} />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item name="phone" label="电话">
            <Input placeholder="请输入电话" />
          </Form.Item>
          <Form.Item name="password" label="修改密码">
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">保存修改</Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'email',
      label: '邮箱设置',
      icon: <MailOutlined />,
      children: (
        <Form form={form} layout="vertical" style={{ maxWidth: 600 }}>
          <Form.Item name="smtpServer" label="SMTP服务器" rules={[{ required: true }]}>
            <Input placeholder="请输入SMTP服务器地址" />
          </Form.Item>
          <Form.Item name="smtpPort" label="SMTP端口" rules={[{ required: true }]}>
            <Input placeholder="请输入SMTP端口" />
          </Form.Item>
          <Form.Item name="smtpUsername" label="SMTP用户名" rules={[{ required: true }]}>
            <Input placeholder="请输入SMTP用户名" />
          </Form.Item>
          <Form.Item name="smtpPassword" label="SMTP密码" rules={[{ required: true }]}>
            <Input.Password placeholder="请输入SMTP密码" />
          </Form.Item>
          <Form.Item name="senderName" label="发件人名称" rules={[{ required: true }]}>
            <Input placeholder="请输入发件人名称" />
          </Form.Item>
          <Form.Item name="senderEmail" label="发件人邮箱" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="请输入发件人邮箱" />
          </Form.Item>
          <Form.Item name="emailSignature" label="邮件签名">
            <Input.TextArea rows={4} placeholder="请输入邮件签名" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary">保存设置</Button>
              <Button>发送测试邮件</Button>
            </Space>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'team',
      label: '团队管理',
      icon: <TeamOutlined />,
      children: (
        <div>
          <Button type="primary" style={{ marginBottom: 16 }}>
            添加成员
          </Button>
          <Table
            columns={[
              { title: '用户名', dataIndex: 'username' },
              { title: '邮箱', dataIndex: 'email' },
              { title: '角色', dataIndex: 'role' },
              {
                title: '状态',
                dataIndex: 'status',
                render: (active: boolean) => (
                  <Switch checked={active} />
                ),
              },
              {
                title: '操作',
                key: 'action',
                render: () => (
                  <Space>
                    <Button type="link">编辑</Button>
                    <Button type="link" danger>删除</Button>
                  </Space>
                ),
              },
            ]}
            dataSource={[
              {
                key: '1',
                username: 'admin',
                email: 'admin@example.com',
                role: '管理员',
                status: true,
              },
              // 更多成员数据...
            ]}
          />
        </div>
      ),
    },
    {
      key: 'data',
      label: '数据管理',
      icon: <DatabaseOutlined />,
      children: (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card title="数据导入">
            <Space direction="vertical">
              <div>
                <h4>导入客户数据</h4>
                <Upload
                  action="/api/import/customers"
                  accept=".csv,.xlsx"
                >
                  <Button icon={<UploadOutlined />}>选择文件</Button>
                </Upload>
              </div>
              <div>
                <h4>导入模板</h4>
                <Upload
                  action="/api/import/templates"
                  accept=".html,.json"
                >
                  <Button icon={<UploadOutlined />}>选择文件</Button>
                </Upload>
              </div>
            </Space>
          </Card>
          <Card title="数据导出">
            <Space direction="vertical">
              <div>
                <h4>导出范围</h4>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="选择要导出的数据"
                  options={[
                    { value: 'customers', label: '客户数据' },
                    { value: 'templates', label: '邮件模板' },
                    { value: 'campaigns', label: '营销活动' },
                  ]}
                />
              </div>
              <Button type="primary">导出数据</Button>
            </Space>
          </Card>
        </Space>
      ),
    },
  ];

  return (
    <Container>
      <Card>
        <Tabs
          items={items.map(item => ({
            ...item,
            label: (
              <span>
                {item.icon}
                {item.label}
              </span>
            ),
          }))}
        />
      </Card>
    </Container>
  );
};

export default SystemSettings;