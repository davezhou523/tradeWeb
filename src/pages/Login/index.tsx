import React, { useEffect } from 'react';
import { Card, Form, Input, Button, Checkbox, Tabs, Select, message } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleOutlined, UserOutlined, LockOutlined, MobileOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

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
  const { i18n, t } = useTranslation();
  
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
      message.success(t('login_success'));
    } catch (error) {
      message.error(t('login_failed'));
    }
  };

  const items = [
    {
      key: 'email',
      label: t('login_email'),
      children: (
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="email" rules={[{ required: true, message: t('please_input_email') }]}>
            <Input prefix={<UserOutlined />} placeholder={t('email')} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: t('please_input_password') }]}>
            <Input.Password prefix={<LockOutlined />} placeholder={t('password')} />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Checkbox>{t('remember_me')}</Checkbox>
              <a href="/forgot-password">{t('forgot_password')}</a>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t('login')}
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'phone',
      label: t('login_phone'),
      children: (
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="phone" rules={[{ required: true, message: t('please_input_phone') }]}>
            <Input
              prefix={<MobileOutlined />}
              addonBefore={
                <Select defaultValue="86" style={{ width: 70 }}>
                  <Select.Option value="86">+86</Select.Option>
                  <Select.Option value="87">+87</Select.Option>
                </Select>
              }
              placeholder={t('phone')}
            />
          </Form.Item>
          <Form.Item name="verificationCode" rules={[{ required: true, message: t('please_input_code') }]}>
            <Input
              placeholder={t('code')}
              suffix={
                <Button type="link" size="small">
                  {t('get_code')}
                </Button>
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t('login')}
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <LoginContainer>
      <LoginCard>
        {/* 语言切换下拉框 */}
        <div style={{ textAlign: 'right', marginBottom: 8 }}>
          <Select
            defaultValue={i18n.language}
            style={{ width: 100 }}
            onChange={lng => i18n.changeLanguage(lng)}
          >
            <Select.Option value="zh">中文</Select.Option>
            <Select.Option value="en">English</Select.Option>
          </Select>
        </div>
        <LogoContainer>
          <h1>{t('app_name') || '外贸SaaS系统'}</h1>
        </LogoContainer>
        <Button
          icon={<GoogleOutlined />}
          block
          style={{ marginBottom: 24 }}
          onClick={() => console.log('Google login clicked')}
        >
          {t('login_with_google')}
        </Button>
        <Tabs items={items} />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <span>{t('no_account')}</span>
          <a href="/register">{t('register_now')}</a>
        </div>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;