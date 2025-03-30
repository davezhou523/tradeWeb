import React from 'react';
import { Card, Row, Col, Statistic, Button, List, Timeline, Space } from 'antd';
import { UserOutlined, MailOutlined, PlusOutlined, BellOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
  .ant-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 24px;
    transition: all 0.3s;
    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }
    .ant-card-head {
      border-bottom: 1px solid #f0f0f0;
      padding: 16px 24px;
      .ant-card-head-title {
        font-size: 16px;
        font-weight: 500;
      }
    }
    .ant-card-body {
      padding: 24px;
    }
  }
  .ant-statistic {
    .ant-statistic-title {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }
    .ant-statistic-content {
      font-size: 28px;
      font-weight: 600;
      background: linear-gradient(45deg, #1890ff, #40a9ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      .anticon {
        font-size: 24px;
        margin-right: 8px;
        color: #1890ff;
      }
    }
  }
  .ant-btn {
    border-radius: 4px;
    height: 40px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s;
    .anticon {
      font-size: 16px;
    }
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(24, 144, 255, 0.2);
    }
  }
  .ant-list-item {
    padding: 16px;
    border-radius: 4px;
    transition: all 0.3s;
    border: 1px solid transparent;
    &:hover {
      background-color: #e6f7ff;
      transform: translateX(4px);
      border-color: #91d5ff;
    }
    .anticon {
      color: #1890ff;
      margin-right: 8px;
    }
  }
  .ant-timeline-item-content {
    padding: 12px 16px;
    background: #f9f9f9;
    border-radius: 4px;
    margin: 0 0 0 28px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
    border-left: 2px solid #1890ff;
    &:hover {
      background: #e6f7ff;
      transform: translateX(4px);
    }
  }
`;

const ActionCard = styled(Card)`
  margin-bottom: 24px;
`;

const Dashboard: React.FC = () => {
  const quickActions = [
    {
      title: '新建邮件活动',
      icon: <MailOutlined />,
      path: '/email-marketing',
    },
    {
      title: '添加客户',
      icon: <UserOutlined />,
      path: '/customer-acquisition',
    },
    {
      title: '创建模板',
      icon: <PlusOutlined />,
      path: '/email-templates',
    },
  ];

  const todoItems = [
    '待回复客户邮件 (3)',
    '待发送营销活动 (2)',
    '待审核新客户 (5)',
    '待更新客户资料 (1)',
  ];

  const notifications = [
    {
      title: '新客户注册',
      time: '10分钟前',
      content: '公司A完成了注册',
    },
    {
      title: '邮件活动完成',
      time: '30分钟前',
      content: '"新产品发布"活动已发送完成',
    },
    {
      title: '客户回复',
      time: '1小时前',
      content: '公司B对产品表示感兴趣',
    },
  ];

  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="客户总数"
              value={1234}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="本月邮件活动"
              value={15}
              prefix={<MailOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="平均回复率"
              value={35.8}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={16}>
          <ActionCard title="快捷操作">
            <Row gutter={[16, 16]}>
              {quickActions.map((action) => (
                <Col span={8} key={action.title}>
                  <Button
                    type="primary"
                    icon={action.icon}
                    block
                    href={action.path}
                  >
                    {action.title}
                  </Button>
                </Col>
              ))}
            </Row>
          </ActionCard>

          <Card title="待办事项">
            <List
              dataSource={todoItems}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    <BellOutlined />
                    {item}
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="系统通知">
            <Timeline
              items={notifications.map((notification) => ({
                children: (
                  <div>
                    <p style={{ margin: 0 }}>
                      <strong>{notification.title}</strong>
                      <span style={{ float: 'right', color: '#999' }}>
                        {notification.time}
                      </span>
                    </p>
                    <p style={{ margin: '4px 0 0', color: '#666' }}>
                      {notification.content}
                    </p>
                  </div>
                ),
              }))}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;