import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Select, DatePicker, Row, Col, Statistic, Input } from 'antd';
import { PlusOutlined, MailOutlined, LineChartOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 24px;
`;

const StatsCard = styled(Card)`
  margin-bottom: 24px;
`;

const EmailMarketing: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '发送时间',
      dataIndex: 'sendTime',
      key: 'sendTime',
    },
    {
      title: '目标客户数',
      dataIndex: 'targetCount',
      key: 'targetCount',
    },
    {
      title: '打开率',
      dataIndex: 'openRate',
      key: 'openRate',
      render: (rate: number) => `${rate}%`,
    },
    {
      title: '点击率',
      dataIndex: 'clickRate',
      key: 'clickRate',
      render: (rate: number) => `${rate}%`,
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link">查看详情</Button>
          <Button type="link">复制</Button>
        </Space>
      ),
    },
  ];

  const mockData = [
    {
      key: '1',
      name: '新产品发布邮件',
      status: '已发送',
      sendTime: '2024-03-28 10:00',
      targetCount: 1000,
      openRate: 45.5,
      clickRate: 12.3,
    },
    // 更多模拟数据...
  ];

  const handleCreateCampaign = (values: any) => {
    console.log('Form values:', values);
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <Container>
      <StatsCard>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Statistic
              title="总发送量"
              value={5000}
              prefix={<MailOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="平均打开率"
              value={42.3}
              suffix="%"
              prefix={<LineChartOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="平均点击率"
              value={15.8}
              suffix="%"
              prefix={<LineChartOutlined />}
            />
          </Col>
        </Row>
      </StatsCard>

      <Card
        title="邮件活动列表"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
            创建活动
          </Button>
        }
      >
        <Table columns={columns} dataSource={mockData} />
      </Card>

      <Modal
        title="创建邮件活动"
        open={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form form={form} onFinish={handleCreateCampaign} layout="vertical">
          <Form.Item
            name="name"
            label="活动名称"
            rules={[{ required: true, message: '请输入活动名称' }]}
          >
            <Input.TextArea placeholder="请输入活动名称" />
          </Form.Item>

          <Form.Item
            name="template"
            label="选择模板"
            rules={[{ required: true, message: '请选择邮件模板' }]}
          >
            <Select
              placeholder="请选择邮件模板"
              options={[
                { value: 'template1', label: '新产品介绍模板' },
                { value: 'template2', label: '促销活动模板' },
                { value: 'template3', label: '节日问候模板' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="customerGroup"
            label="目标客户群体"
            rules={[{ required: true, message: '请选择目标客户群体' }]}
          >
            <Select
              placeholder="请选择客户群体"
              mode="multiple"
              options={[
                { value: 'group1', label: '北美客户' },
                { value: 'group2', label: '欧洲客户' },
                { value: 'group3', label: '重点客户' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="sendTime"
            label="发送时间"
            rules={[{ required: true, message: '请选择发送时间' }]}
          >
            <DatePicker
              showTime
              style={{ width: '100%' }}
              placeholder="选择发送时间"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};

export default EmailMarketing;