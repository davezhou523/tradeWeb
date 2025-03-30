import React, { useEffect } from 'react';
import { Card, Form, Input, Button, Checkbox, Tabs, Select, message } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleOutlined, UserOutlined, LockOutlined, MobileOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 24px;
  h1 {
    font-size: 28px;
    color: #1890ff;
  }
`;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { login, loginWithPhone } = useAuth();
  
  // 设置默认账号和密码
  useEffect(() => {
    form.setFieldsValue({
      email: 'admin',
      password: 'admin'
    });
  }, [form]);

  const handleSubmit = async (values: any) => {
    try {
      if (values.email) {
        // 检查是否是默认admin账号和密码
        if (values.email === 'admin' && values.password === 'admin') {
          await login('admin@example.com', 'admin');
        } else {
          await login(values.email, values.password);
        }
      } else if (values.phone) {
        await loginWithPhone(values.phone, values.verificationCode);
      }
      message.success('登录成功');
    } catch (error) {
      message.error('登录失败，请检查账号密码');
    }
  };

  const items = [
    {
      key: 'email',
      label: '邮箱登录',
      children: (
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
            <Input prefix={<UserOutlined />} placeholder="邮箱" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Checkbox>记住登录状态</Checkbox>
              <a href="/forgot-password">忘记密码？</a>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'phone',
      label: '手机号登录',
      children: (
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="phone" rules={[{ required: true, message: '请输入手机号' }]}>
            <Input
              prefix={<MobileOutlined />}
              addonBefore={
                <Select defaultValue="86" style={{ width: 70 }}>
                  <Select.Option value="86">+86</Select.Option>
                  <Select.Option value="87">+87</Select.Option>
                </Select>
              }
              placeholder="手机号"
            />
          </Form.Item>
          <Form.Item name="verificationCode" rules={[{ required: true, message: '请输入验证码' }]}>
            <Input
              placeholder="验证码"
              suffix={
                <Button type="link" size="small">
                  获取验证码
                </Button>
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <LoginContainer>
      <LoginCard>
        <LogoContainer>
          <h1>外贸SaaS系统</h1>
        </LogoContainer>
        <Button
          icon={<GoogleOutlined />}
          block
          style={{ marginBottom: 24 }}
          onClick={() => console.log('Google login clicked')}
        >
          使用Google账号登录
        </Button>
        <Tabs items={items} />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <span>还没有账号？</span>
          <a href="/register">立即注册</a>
        </div>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;